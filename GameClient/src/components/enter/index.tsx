import './style.css'
import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {checkUserAuth, deleteUser, handleError, setError, signIn} from "../../store/appStore.ts";
import {signInRequest} from "../../dto/signInRequest.ts";
import {useNavigate} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import i18n from "i18next";
import {HttpStatusCode} from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";


const Enter = () => {
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const {t} = useTranslation();
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [buttonText, setButtonText] = useState<string>(t("actions.enter"));
    const [buttonScheme, setButtonScheme] = useState<string>("green");
    const [isHide, setIsHide] = useState<boolean>(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isEmailError = !emailRegex.test(emailInput);
    const isPasswordError = passwordInput == "";

    const isFormError = isEmailError || isPasswordError;
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailInput(value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordInput(value);
    };

    useEffect(() => {
        checkUserAuth()
            .then(response => {
                if (response) {
                    navigate(paths.menu);
                }
            })
            .catch(() => {

            });
    }, []);

    const handleSignIn = async () => {
        const signInRequest: signInRequest = {
            email: emailInput,
            password: passwordInput
        };
        const actionResult = await appDispatch(signIn(signInRequest));
        if (signIn.rejected.match(actionResult)) {
            const error = actionResult.payload as { message: string; code: number };
            if (error.code === HttpStatusCode.Unauthorized) {
                setButtonText(t("enterError"));
                setButtonScheme("red");
                setTimeout(() => {
                    setButtonText(t("actions.enter"));
                    setButtonScheme("green");
                }, 1000);
            } else {
                handleError(error, navigate, appDispatch, setError, deleteUser);
            }
        } else if (signIn.fulfilled.match(actionResult)) {
            navigate(paths.menu);
        }
    };

    useEffect(() => {
        setButtonText(t("actions.enter"));
    }, [i18n.language]);

    const handleKeyDown = async (k: React.KeyboardEvent<HTMLInputElement>) => {
        if (k.key === "Enter" && !isFormError) {
            await handleSignIn();
        }
    };

    return (
        <div className={"enterContainer"}>
            <form>
                <FormControl
                    isRequired
                    isInvalid={isEmailError}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Input
                        marginTop={'10px'}
                        autoComplete={"email"}
                        id={"emailEnter"}
                        placeholder={t("email")}
                        type={'email'} value={emailInput}
                        onChange={handleEmailChange}/>
                    <FormErrorMessage>
                        {t("invalid.email")}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isRequired
                    isInvalid={isPasswordError}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <InputGroup marginTop={'10px'} flexDirection={'column'}>
                        <Input
                            pr='4.5rem'
                            onKeyDown={handleKeyDown}
                            autoComplete={"current-password"}
                            id={"passEnter"}
                            placeholder={t("password")}
                            type={isHide ? 'password' : 'text'}
                            value={passwordInput}
                            onChange={handlePasswordChange}/>
                        <FormErrorMessage>
                            {t("invalid.password")}
                        </FormErrorMessage>
                        <InputRightElement width='4.5rem'>
                            <Button
                                onClick={() => setIsHide(hide => !hide)}
                                h='1.75rem'
                            >
                                {isHide ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button
                        isLoading={appState.isLoading}
                        onClick={handleSignIn}
                        isDisabled={isFormError}
                        marginTop={'10px'}
                        marginBottom={'10px'}
                        colorScheme={buttonScheme}
                        fontSize={'1.3em'}
                    >
                        {buttonText}
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}

export default Enter;