import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import NavButtons from "../navButtons";
import {Avatar, Button, Input, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {MdArrowForward, MdCheck, MdDelete, MdOutlineRefresh} from "react-icons/md";
import './style.css'
import {serverUrls} from "../../constansts/serverUrls.ts";
import {paths} from "../../constansts/paths.ts";
import {gameStates} from "../../enums/gameStates.ts";
import {game} from "../../dto/game.ts";
import axios from "axios";
import {gameResponse} from "../../dto/gameResponse.ts";
import {changeLoading, deleteUser, handleError, setError} from "../../store/appStore.ts";

const SetAvatar = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [charDescription, setCharDescription] = useState<string>("");
    const {t} = useTranslation();
    const appState = useAppSelector(state => state.app);
    const appDispatch = useAppDispatch();
    const [game, setGame] = useState<game>({
        id: "",
        name: "",
        charName: "",
        gameState: gameStates.created,
        avatarId: ""
    });
    const [isRedirected, setIsRedirected] = useState<boolean>(false);


    useEffect(() => {
        if (id === undefined) {
            navigate(paths.welcome);
        } else {
            axios.get<gameResponse>(serverUrls.getGame + `?id=${id}`)
                .then(response => {
                    const gameResponse = response.data;
                    setGame(game => (
                        {
                            ...game,
                            id: gameResponse.gameId,
                            avatarId: gameResponse.avatarId,
                            charName: gameResponse.charName
                        }))
                })
                .catch(error => {
                    if (!isRedirected) {
                        setIsRedirected(true);
                        handleError(error, navigate, appDispatch, setError, deleteUser);
                    }
                });
        }
    }, []);

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCharDescription(e.target.value);
    };

    const handleNext = () => {
        navigate(paths.chat + `/${game.id}`, {replace: true});
    };

    const handleGenerateImage = () => {
        appDispatch(changeLoading(true))
        const data = {description: charDescription, gameId: game.id}
        axios.post<{ imageId: string }>(serverUrls.generateAvatar, data)
            .then(response => {
                appDispatch(changeLoading(false))
                setGame(game => ({...game, avatarId: response.data.imageId}));
            })
            .catch(error => {
                appDispatch(changeLoading(false))
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    };

    const handleRemoveAvatar = () => {
        appDispatch(changeLoading(true))
        axios.post(serverUrls.removeAvatar, {gameId: game.id})
            .then(() => {
                appDispatch(changeLoading(false))
                setGame(game => ({...game, avatarId: ""}));
            })
            .catch(error => {
                appDispatch(changeLoading(false))
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
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
                className={"boxShadow border3Darkslateblue"}
            >
                {t("avatar")}
            </Text>
            <Avatar
                boxSize={"200px"}
                marginLeft={"auto"}
                marginRight={"auto"}
                src={serverUrls.avatar + `/${game.avatarId}`}
            />
            <div className={"boxShadow border3Darkslateblue describeContainer"}>
                <Text
                    margin={'auto'}
                    textAlign={'center'}
                    fontSize={'1.3em'}
                >
                    {game.charName}
                </Text>
            </div>
            <div className={"boxShadow border3Darkslateblue describeContainer"}>
                <Input
                    marginBottom={'10px'}
                    placeholder={t("charDescription")}
                    type={'text'}
                    value={charDescription}
                    onChange={handleDescriptionChange}
                />

                <div className={"btnGroup1"}>
                    {game.avatarId === "" ? <></> :
                        <Button
                            isLoading={appState.isLoading}
                            marginBottom={'10px'}
                            fontSize={"1.3em"}
                            leftIcon={<MdDelete/>}
                            onClick={handleRemoveAvatar}
                            colorScheme={"red"}
                        >
                            {t("actions.delete")}
                        </Button>}
                    {charDescription != "" ?
                        <Button
                            marginBottom={'10px'}
                            isLoading={appState.isLoading}
                            fontSize={"1.3em"}
                            rightIcon={game.avatarId != "" ? <MdOutlineRefresh/> : <MdCheck/>}
                            isDisabled={appState.isLoading}
                            onClick={handleGenerateImage}
                            colorScheme={"green"}
                        >
                            {game.avatarId !== "" ? t("actions.update") : t("actions.confirm")}
                        </Button> : <></>}
                </div>
                <div className={"btnGroup1"}>
                    <Button
                        isLoading={appState.isLoading}
                        fontSize={"1.3em"}
                        rightIcon={<MdArrowForward/>}
                        isDisabled={appState.isLoading}
                        onClick={handleNext}
                        colorScheme={"green"}
                    >
                        {t("actions.next")}
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default SetAvatar;