import './style.css';
import {Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {errorInitialState, setError} from "../../store/appStore.ts";

const Error = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [error, setError_] = useState<string>("");
    const appState = useAppSelector(state => state.app);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (appState.error === errorInitialState) {
            navigate(paths.welcome);
        }
        setError_(`Error ${appState.error.code}. ${appState.error.message}`);
        return () => {
            appDispatch(setError(errorInitialState));
        };
    }, []);

    return (
        <>
            <div className={"errorContainer"}>
                <Text
                    className={"boxShadow border3Darkslateblue"}
                    fontSize={'2.2em'}
                    margin={"20px"}
                    padding={"20px"}
                    textAlign={'center'}
                >
                    {t("errorTitle1")}<br/>
                    {t("errorTitle2")}
                </Text>
                <Text
                    className={"boxShadow border3Darkslateblue"}
                    fontSize={'2.0em'}
                    margin={"20px"}
                    padding={"20px"}
                    textAlign={'center'}
                >
                    {error}
                </Text>
            </div>
        </>
    )
}

export default Error;