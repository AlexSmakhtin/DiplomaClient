import './style.css'
import NavButtons from "../navButtons";
import GameButtons from "../gameButtons";
import {useEffect, useState} from "react";
import {checkUserAuth, deleteUser, handleError, setError} from "../../store/appStore.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {paths} from "../../constansts/paths.ts";
import axios from "axios";
import {serverUrls} from "../../constansts/serverUrls.ts";

const Menu = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const [isRedirected, setIsRedirected] = useState<boolean>(false);
    const user = useAppSelector(state => state.app.user);
    const appDispatch = useAppDispatch();
    const [retryBtnText, setRetryBtnText] = useState<string>(t("retry"));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setRetryBtnText(t("retry"));
    }, [i18n.language]);

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

    const handleRetry = async () => {
        setIsLoading(true);
        try {
            await axios.get(serverUrls.retryConfirmEmail);
            setIsLoading(false);
            setRetryBtnText(t("done"))
            setTimeout(() => {
                setRetryBtnText(t("retry"))
            }, 3000);
        } catch (error) {
            setIsLoading(false);
            if (!isRedirected) {
                setIsRedirected(true);
                handleError(error as { message: string; code: number }, navigate, appDispatch, setError, deleteUser);
            }
        }
    };

    return (
        <div className={"gameContainer"}>
            <div className={"btnGroup1"}>
                <NavButtons/>
            </div>
            <Text
                fontWeight={"bold"}
                marginLeft={"auto"}
                marginRight={"auto"}
                padding={"10px"}
                fontSize={"1.5em"}
                textAlign={"center"}
                className={"boxShadow border3Darkslateblue"}>
                {t("mainMenu")}
            </Text>
            {user.status === 0 ?
                <Text
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    padding={"10px"}
                    fontSize={'1.5em'}
                    textAlign={'center'}
                    className={'boxShadow border3Darkslateblue'}
                >
                    {t("confirmEmailStart") + user.email + t("confirmEmailEnd")}&nbsp;
                    <Button
                        isLoading={isLoading}
                        onClick={handleRetry}
                    >
                        {retryBtnText}
                    </Button>
                </Text> : <></>}
            <div className={"btnGroup2"}>
                <GameButtons/>
            </div>
        </div>
    )
}

export default Menu;