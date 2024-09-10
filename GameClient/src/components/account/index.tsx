import './style.css'
import {ChangeEvent, useEffect, useState} from "react";
import {
    checkUserAuth,
    deleteData,
    deleteUser,
    handleError,
    setError,
    setUser,
    updateData
} from "../../store/appStore.ts";
import {paths} from "../../constansts/paths.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store.ts";
import NavButtons from "../navButtons";
import {
    Button, FormControl, FormErrorMessage,
    Input,
    InputGroup, InputLeftAddon, InputRightElement,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {MdOutlineExitToApp} from "react-icons/md";
import axios from "axios";
import {user} from "../../dto/user.ts";
import {serverUrls} from "../../constansts/serverUrls.ts";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {signUpResponse} from "../../dto/signUpResponse.ts";

const Account = () => {
    const [isRedirected, setIsRedirected] = useState<boolean>(false);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const {t} = useTranslation();
    const [currentUser, setCurrentUser] = useState<user>({name: "", email: "", status: 0});
    const [userToChange, setUserToChange] = useState<user>({name: "", email: "", status: 0});
    const [saveDataButtonText, setSaveDataButtonText] = useState<string>(t("save"));
    const [isChangesLoading, setIsChangesLoading] = useState<boolean>(false);
    const [oldPass, setOldPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [confNewPass, setConfNewPass] = useState<string>("");
    const [isHide, setIsHide] = useState<boolean>(true);

    useEffect(() => {
        checkUserAuth()
            .then(response => {
                if (!response) {
                    if (!isRedirected) {
                        setIsRedirected(true);
                        navigate(paths.welcome);
                    }
                }
            })
            .catch(error => {
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    }, []);

    useEffect(() => {
        axios.get<user>(serverUrls.getUser)
            .then(response => {
                setCurrentUser(response.data);
                setUserToChange(response.data);
            })
            .catch(error => {
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    }, []);

    const handleExit = () => {
        deleteData();
        navigate(paths.welcome);
    };

    const handleNewPassword = () => {
        setIsChangesLoading(true);
        axios.post(serverUrls.changePassword, {oldPassword: oldPass, newPassword: newPass})
            .then(() => {
                setIsChangesLoading(false);
                setSaveDataButtonText(t("done"));
                setTimeout(() => {
                    setSaveDataButtonText(t("save"));
                }, 1000);
            })
            .catch(error => {
                setIsChangesLoading(false);
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    };

    const handleChangeData = () => {
        setIsChangesLoading(true);
        axios.post<signUpResponse>(serverUrls.updateUser, {name: userToChange.name, email: userToChange.email})
            .then(response => {
                setIsChangesLoading(false);
                setCurrentUser({name: response.data.name, email: response.data.email, status: response.data.status});
                updateData(response.data);
                appDispatch(setUser(response.data));
                setUserToChange({name: response.data.name, email: response.data.email, status: response.data.status});
                setSaveDataButtonText(t("done"));
                setTimeout(() => {
                    setSaveDataButtonText(t("save"));
                }, 1000);
            })
            .catch(error => {
                setIsChangesLoading(false);
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserToChange({...currentUser, name: value});
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserToChange({...currentUser, email: value});
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(userToChange.email);
    const isSaveDataButtonDisabled = (currentUser.name === userToChange.name && currentUser.email === userToChange.email)
        || !userToChange.name || !isValidEmail;

    const handleOldPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setOldPass(value);
    };

    const handleNewPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setNewPass(value);
    };

    const handleConfNewPassChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setConfNewPass(value);
    };
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{7,}$/;
    const isPasswordValid = passwordRegex.test(newPass);
    const isSaveNewPassButtonDisabled = !oldPass || !newPass || !oldPass || newPass !== confNewPass || !isPasswordValid;

    return (
        <div className={'gameContainer'}>
            <div className={"btnGroup1"}>
                <NavButtons/>
            </div>
            <Text
                fontWeight={"bold"}
                marginLeft={"auto"}
                marginRight={"auto"}
                padding={"10px"}
                width={"max-content"}
                fontSize={"1.5em"}
                textAlign={"center"}
                className={"boxShadow border3Darkslateblue"}>
                {t("account")}
            </Text>
            <div className={'boxShadow border3Darkslateblue'}>
                <div className={'accountNavigation'}>
                    <Tabs
                        align={'center'}
                        width={'100%'}
                        marginTop={'10px'}
                        variant='enclosed'
                    >
                        <TabList>
                            <Tab>{t("personalData")}</Tab>
                            <Tab>{t("security")}</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <InputGroup>
                                    <InputLeftAddon>{`${t("name")}:`}</InputLeftAddon>
                                    <Input
                                        onChange={handleNameChange}
                                        textAlign={'center'}
                                        value={userToChange.name}
                                    />
                                </InputGroup>
                                <InputGroup marginTop={'10px'}>
                                    <InputLeftAddon>{`${t("email")}:`}</InputLeftAddon>
                                    <Input
                                        onChange={handleEmailChange}
                                        textAlign={'center'}
                                        value={userToChange.email}
                                    />
                                </InputGroup>
                                <div className={'btnGroup2'}>
                                    <Button
                                        isDisabled={isSaveDataButtonDisabled}
                                        onClick={handleChangeData}
                                        isLoading={isChangesLoading}
                                        marginTop={'20px'}
                                        colorScheme={'green'}
                                    >
                                        {saveDataButtonText}
                                    </Button>
                                    <Button
                                        onClick={handleExit}
                                        leftIcon={<MdOutlineExitToApp/>}
                                        colorScheme={'red'}
                                        marginTop={'20px'}
                                        aria-label={'exit'}
                                    >
                                        {t("actions.logOut")}
                                    </Button>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <Text>{t("changePassword")}</Text>
                                <FormControl
                                    isInvalid={!oldPass || oldPass === newPass}
                                >
                                    <InputGroup marginTop={'10px'} flexDirection={'column'}>
                                        <Input
                                            pr='4.5rem'
                                            onChange={handleOldPassChange}
                                            value={oldPass}
                                            type={isHide ? 'password' : "text"}
                                            marginTop={'10px'}
                                            placeholder={t("oldPassword")}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button
                                                marginTop={'20px'}
                                                onClick={() => setIsHide(hide => !hide)}
                                                h='1.75rem'
                                            >
                                                {isHide ? <AiFillEyeInvisible size={22}/> : <AiFillEye size={22}/>}
                                            </Button>
                                        </InputRightElement>
                                        <FormErrorMessage>{oldPass === newPass ? t("invalid.oldIsNew") :
                                            t("invalid.password")}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <FormControl
                                    isInvalid={!isPasswordValid}
                                >
                                    <Input
                                        onChange={handleNewPassChange}
                                        value={newPass}
                                        type={isHide ? 'password' : "text"}
                                        marginTop={'10px'}
                                        placeholder={t("newPassword")}
                                    />
                                    <FormErrorMessage>{t("invalid.password")}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={newPass !== confNewPass}
                                >
                                    <Input
                                        onChange={handleConfNewPassChange}
                                        value={confNewPass}
                                        type={isHide ? 'password' : "text"}
                                        marginTop={'10px'}
                                        placeholder={t("confirmPassword")}
                                    />
                                    <FormErrorMessage>{t("invalid.passwordDoesntMatch")}</FormErrorMessage>
                                </FormControl>
                                <Button
                                    isDisabled={isSaveNewPassButtonDisabled}
                                    isLoading={isChangesLoading}
                                    onClick={handleNewPassword}
                                    marginTop={'20px'}
                                    colorScheme={'green'}
                                >
                                    {saveDataButtonText}
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

export default Account;