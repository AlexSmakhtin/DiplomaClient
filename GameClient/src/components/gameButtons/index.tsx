import {Button} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import './style.css'
import {useNavigate} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import {useAppSelector} from "../../store/store.ts";

const GameButtons = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.app.user);

    const handleNewGame = () => {
        navigate(paths.newGame);
    };

    const handleContinue = () => {
        navigate(paths.history);
    };

    const handleAgreement = () => {
        navigate(paths.userAgreement);
    };
    const handleAuthor = () => {
        navigate(paths.author);
    };

    return (
        <div className={'gameButtons'}>
            <Button
                isDisabled={user.status === 0}
                className={'boxShadow'}
                onClick={handleNewGame}
                margin={'auto'}
                padding={'30px'}
                fontSize={'1.2em'}
                colorScheme={"green"}
            >
                {t("actions.newGame")}
            </Button>
            <Button
                isDisabled={user.status === 0}
                className={'boxShadow'}
                onClick={handleContinue}
                margin={'auto'}
                padding={'30px'}
                fontSize={'1.2em'}
                colorScheme={"green"}
            >
                {t("actions.continue")}
            </Button>
            <Button
                className={'boxShadow'}
                onClick={handleAgreement}
                width={'100%'}
                margin={'auto'}
                padding={'30px'}
                fontSize={'1.2em'}
                colorScheme={"green"}
            >
                {t("actions.userAgreement")}
            </Button>
            <Button
                className={'boxShadow'}
                onClick={handleAuthor}
                width={'100%'}
                margin={'auto'}
                padding={'30px'}
                fontSize={'1.2em'}
                colorScheme={"green"}
            >
                {t("actions.author")}
            </Button>
        </div>
    )
}

export default GameButtons;