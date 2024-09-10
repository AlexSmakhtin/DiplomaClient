import NavButtons from "../navButtons";
import {Button, FormControl, FormErrorMessage, Input, Stack, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import './style.css'
import {ChangeEvent,  useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import { MdArrowForward} from "react-icons/md";
import {newGameRequest} from "../../dto/newGameRequest.ts";
import {paths} from "../../constansts/paths.ts";
import axios from "axios";
import {serverUrls} from "../../constansts/serverUrls.ts";
import {changeLoading, deleteUser, setError, handleError} from "../../store/appStore.ts";

const NewGame = () => {
    const {t} = useTranslation();
    const appState = useAppSelector(state => state.app);
    const navigate = useNavigate();
    const [gameName, setGameName] = useState<string>("");
    const [charName, setCharName] = useState<string>("");
    const appDispatch = useAppDispatch();
    const isGameNameError = gameName.length === 0;
    const isCharNameError = charName.length === 0;

    const isFormError = isGameNameError || isCharNameError

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGameName(value);
    };
    const handleCharNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCharName(value);
    };

    const handleNext = () => {
        const data: newGameRequest = {
            gameName: gameName,
            charName: charName
        };
        appDispatch(changeLoading(true));
        axios.post<{ gameId: string }>(serverUrls.createNewGame, data)
            .then(response => {
                navigate(paths.avatar + `/${response.data.gameId}`);
                appDispatch(changeLoading(false));
            })
            .catch(error => {
                appDispatch(changeLoading(false));
                handleError(error, navigate, appDispatch, setError, deleteUser);
            });
    };

    return (
        <>
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
                    {t("actions.newGame")}
                </Text>
                <div className={"gameCreateContainer border3Darkslateblue boxShadow"}>
                    <Stack spacing={4}>
                        <FormControl
                            isInvalid={isGameNameError}
                            isRequired
                        >
                            <Input
                                placeholder={t("gameName")}
                                type={"text"}
                                value={gameName}
                                onChange={handleNameChange}/>
                            <FormErrorMessage>{t("errorGameName")}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={isCharNameError}
                            isRequired
                        >
                            <Input
                                placeholder={t("playerName")}
                                type={"text"}
                                value={charName}
                                onChange={handleCharNameChange}/>
                            <FormErrorMessage>{t("errorCharName")}</FormErrorMessage>
                        </FormControl>
                        <div className={"btnGroup1"}>
                            <Button
                                isLoading={appState.isLoading}
                                fontSize={"1.3em"}
                                rightIcon={<MdArrowForward/>}
                                isDisabled={isFormError}
                                onClick={handleNext}
                                colorScheme={"green"}
                            >
                                {t("actions.next")}
                            </Button>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default NewGame;