import './style.css'
import {Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {signUp} from "../../store/appStore.ts";
import {signUpRequest} from "../../dto/signUpRequest.ts";
import {paths} from "../../constansts/paths.ts";
import {useNavigate} from "react-router-dom";
import i18n from "i18next";
import {HttpStatusCode} from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const Registration = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const [isHide, setIsHide] = useState<boolean>(true);
    const appState = useAppSelector(state => state.app);
    const [emailInput, setEmailInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
    const [bdInput, setBdInput] = useState<Date>(new Date());
    const [buttonText, setButtonText] = useState<string>(t("actions.registration"));
    const [buttonScheme, setButtonScheme] = useState<string>("green");
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailInput(value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordInput(value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordInput(e.target.value);
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{7,}$/;


    const isNameError = nameInput.length < 2;
    const now = new Date();
    const age = now.getFullYear() - bdInput.getFullYear();
    const monthDifference = now.getMonth() - bdInput.getMonth();
    const dayDifference = now.getDate() - bdInput.getDate();

    const isBdError = age > 18 ||
        (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
    const isEmailError = !emailRegex.test(emailInput);
    const isPasswordError = !passwordRegex.test(passwordInput);
    const isConfirmPasswordError = confirmPasswordInput !== passwordInput;

    const isFormError = isEmailError || isPasswordError || isConfirmPasswordError;

    useEffect(() => {
        setButtonText(t("actions.registration"));
    }, [i18n.language]);

    const handleKeyDown = async (k: React.KeyboardEvent<HTMLInputElement>) => {
        if (k.key === "Enter" && !isFormError) {
            await handleSignUp();
        }
    };

    const handleSignUp = async () => {
        const signUpRequest: signUpRequest = {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
            status: 0,
            birthday: bdInput
        };
        const actionResult = await appDispatch(signUp(signUpRequest));
        if (signUp.rejected.match(actionResult)) {
            const error = actionResult.payload as { message: string; code: number };
            if (error.code === HttpStatusCode.Unauthorized) {
                setButtonText(t("registrationError"));
                setButtonScheme("red");
                setTimeout(() => {
                    setButtonText(t("actions.registration"));
                    setButtonScheme("green");
                }, 1000);
            }else if(error.code === HttpStatusCode.BadRequest){
                setButtonText(t("emailAlreadyUsed"));
                setButtonScheme("red");
                setTimeout(() => {
                    setButtonText(t("actions.registration"));
                    setButtonScheme("green");
                }, 1000);
            }
        } else if (signUp.fulfilled.match(actionResult)) {
            navigate(paths.menu);
        }
    }
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const handleBdChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.valueAsDate != null)
            setBdInput(e.target.valueAsDate);
    };

    const calculateMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate() + 1);
        return maxDate.toISOString().slice(0, 10);
    };

    return (
        <div className={"enterContainer"}>
            <form>
                <FormControl
                    isInvalid={isNameError}
                    isRequired
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Input
                        marginTop={'10px'}
                        autoComplete={"username"}
                        id={"nameReg"}
                        placeholder={t("name")}
                        type={'text'}
                        value={nameInput}
                        onChange={handleNameChange}/>
                    <FormErrorMessage>
                        {t("invalid.name")}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={isEmailError}
                    isRequired
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Input
                        marginTop={'10px'}
                        autoComplete={"email"}
                        id={"emailReg"}
                        placeholder={t("email")}
                        type={'email'}
                        value={emailInput}
                        onChange={handleEmailChange}/>
                    <FormErrorMessage>
                        {t("invalid.email")}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={!isBdError}
                    isRequired
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Input
                        marginTop={'10px'}
                        autoComplete={"bday-day"}
                        id={"bdReg"}
                        placeholder={t("birthday")}
                        type={'date'}
                        onChange={handleBdChange}
                        min='1900-01-01'
                        max={calculateMaxDate()}/>
                    <FormErrorMessage>
                        {t("invalid.birthday")}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={isPasswordError}
                    isRequired
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <InputGroup flexDirection={'column'}>

                    <Input
                        pr='4.5rem'
                        autoComplete={"new-password"}
                        id={"passReg"}
                        marginTop={'10px'}
                        placeholder={t("password")}
                        type={isHide ? 'password' : 'text'}
                        value={passwordInput}
                        onChange={handlePasswordChange}/>
                    <FormErrorMessage>
                        {t("invalid.password")}
                    </FormErrorMessage>
                        <InputRightElement marginTop={'10px'} width='4.5rem'>
                            <Button
                                onClick={() => setIsHide(hide => !hide)}
                                h='1.75rem'
                            >
                                {isHide ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl
                    isInvalid={isConfirmPasswordError}
                    isRequired
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Input
                        onKeyDown={handleKeyDown}
                        autoComplete={"new-password"}
                        id={"confReg"}
                        marginTop={'10px'}
                        placeholder={t("confirmPassword")}
                        type={isHide ? 'password' : 'text'}
                        value={confirmPasswordInput}
                        onChange={handleConfirmPasswordChange}/>
                    <FormErrorMessage>
                        {t("invalid.passwordDoesntMatch")}
                    </FormErrorMessage>
                    <Text margin={'5px'} textAlign={'center'} fontSize={'0.7em'}>
                        Регистрируясь на сайте, вы подтверждаете,<br/> что ознакомились с&nbsp;
                        <a href={'/user_agreement'}>
                            <u>Пользовательским соглашением.</u>
                        </a>
                    </Text>
                    <Button
                        isLoading={appState.isLoading}
                        onClick={handleSignUp}
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

export default Registration;