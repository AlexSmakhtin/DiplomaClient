import './style.css'
import {Button} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {paths} from "../../constansts/paths.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/store.ts";

const NavButtons = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path);
    };
    const user = useAppSelector(state => state.app.user);

    return (
        <>
            <Button
                className={'boxShadow'}
                size={"lg"}
                fontSize={'1.3em'}
                colorScheme={"purple"}
                onClick={() => handleNavigate(paths.menu)}
            >
                {t("mainMenu")}
            </Button>
            <Button
                isDisabled={user.status === 0}
                className={'boxShadow'}
                size={"lg"}
                fontSize={'1.3em'}
                colorScheme={"purple"}
                onClick={() => handleNavigate(paths.history)}
            >
                {t("history")}
            </Button>
            <Button
                className={'boxShadow'}
                size={"lg"}
                fontSize={'1.3em'}
                colorScheme={"purple"}
                onClick={() => handleNavigate(paths.howToPlay)}
            >
                {t("howToPlay")}
            </Button>
            <Button
                className={'boxShadow'}
                size={"lg"}
                fontSize={'1.3em'}
                colorScheme={"purple"}
                onClick={() => handleNavigate(paths.account)}
            >
                {t("account")}
            </Button>
        </>
    )
}

export default NavButtons;