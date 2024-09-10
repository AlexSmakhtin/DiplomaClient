import './style.css'
import NavButtons from "../navButtons";
import {Avatar, Button, IconButton, Input, Spinner, Text} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import {message} from "../../dto/message.ts";
import Message from "../message";
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";
import {serverSignalRUrl, serverUrls} from "../../constansts/serverUrls.ts";
import {useTranslation} from "react-i18next";
import i18n from "../../configs/i18n.ts";
import {game} from "../../dto/game.ts";
import {gameStates} from "../../enums/gameStates.ts";
import axios from "axios";
import {gameResponse} from "../../dto/gameResponse.ts";
import {deleteUser, checkUserAuth, setError, handleError} from "../../store/appStore.ts";
import {MdArrowDownward} from "react-icons/md";

const Chat = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [isChatBottom, setIsChatBottom] = useState<boolean>(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const [lastMessageLength, setLastMessageLength] = useState<number>(0);
    const [needPrinting, setNeedPrinting] = useState<boolean>(true);
    const [isMessagePrinted, setIsMessagePrinted] = useState<boolean>(false);
    const [variant, setVariant] = useState<string>("");
    const [isReady, setIsReady] = useState<boolean>(false);

    const playAudio = (audioPath: string) => {
        const audio = new Audio(audioPath);
        audio.play()
            .then(() => {
                console.log("playing")
            })
            .catch(error => {
                console.log(error);
                console.log("not playing")
            });
        audio.onended = () => {
            audio.remove();
        }
    }
    const handleMessageLengthChanged = (value: number) => {
        setLastMessageLength(value);
    }

    const handleMessagePrinted = () => {
        console.log("printed")
        setIsMessagePrinted(true);
        setIsMessageInProcess(false);
        playAudio('/audio/random3.wav');
    }
    const appDispatch = useAppDispatch();
    const endOfChat = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    const appState = useAppSelector(state => state.app);
    const [choices, setChoices] = useState<{ data: string[], isLocation: boolean }>({data: [], isLocation: false});
    const [connector, setConnector] = useState<HubConnection | null>(null);
    const {id} = useParams<{ id: string }>();
    const [game, setGame] = useState<game>({
        id: "",
        name: "",
        charName: "",
        gameState: gameStates.created,
        avatarId: ""
    });
    const [messages, setMessages] = useState<message[]>([]);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isMessageInProcess, setIsMessageInProcess] = useState<boolean>(false);
    const [isRedirected, setIsRedirected] = useState<boolean>(false);
    const [queue, setQueue] = useState<number>(0);

    useEffect(() => {
        checkUserAuth()
            .then(response => {
                if (!response) {
                    if (!isRedirected) {
                        setIsRedirected(true);
                        navigate(paths.welcome);
                    }
                }
                if (connector !== null) {
                    return;
                }
                if (id === undefined) {
                    navigate(paths.welcome, {replace: true});
                    return;
                }
                const connection = new signalR.HubConnectionBuilder()
                    .withUrl(serverSignalRUrl, {accessTokenFactory: () => appState.user.jwtToken})
                    .build()
                connection.on('Notify', (data: { message: string }) => {
                    console.log("Notify");
                    console.log(data.message);
                });
                connection.on('ReceiveMessage', (data: message) => {
                    setQueue(0);
                    console.log("ReceiveMessage");
                    setMessages(messages => [...messages, data]);
                    playAudio('/audio/random.wav');
                });
                connection.on('ReceiveQueueCount', (data: { count: number }) => {
                    console.log("ReceiveQueueCount");
                    console.log(data.count);
                    setQueue(data.count);
                });
                connection.on('ReceiveMessageInProcess', () => {
                    console.log("ReceiveMessageInProcess");
                    setIsMessageInProcess(true);
                });
                connection.on('ReceiveChoices', (data: { answers: string[] }) => {
                    setQueue(0);
                    console.log("ReceiveChoices");
                    setChoices({data: data.answers, isLocation: false});
                });
                connection.on('ReceiveLocations', (data: { answers: string[] }) => {
                    setQueue(0);
                    console.log("ReceiveLocations");
                    setChoices({data: data.answers, isLocation: true});
                });
                connection.on('ContinueGame', (data: { messages: message[] }) => {
                    setMessages(data.messages);
                    playAudio('/audio/random.wav');
                });
                connection.on('ReceiveGameState', (state: number) => {
                    switch (true) {
                        case state === 0: {
                            setGame(game => ({
                                ...game,
                                gameState: gameStates.created
                            }));
                            break;
                        }
                        case state === 1: {
                            setGame(game => ({
                                ...game,
                                gameState: gameStates.withLocation
                            }));
                            break;
                        }
                        case state === 2: {
                            setGame(game => ({
                                ...game,
                                gameState: gameStates.inProcess
                            }));
                            break;
                        }
                        case state === 3: {
                            setGame(game => ({
                                ...game,
                                gameState: gameStates.ended
                            }));
                            break;
                        }
                        default: {
                            console.error("Unknown gameState")
                            break;
                        }
                    }
                });

                const startConnection = () => {
                    console.log("SignalR started")
                    axios.get<gameResponse>(serverUrls.getGame + `?id=${id}`)
                        .then(response => {
                            const gameResponse = response.data;
                            setGame(game => ({
                                ...game,
                                id: id,
                                avatarId: gameResponse.avatarId,
                                charName: gameResponse.charName,
                                gameState: gameResponse.gameState
                            }))
                            if (gameResponse.gameState !== gameStates.created) {
                                connection.invoke("ContinueGame",
                                    {
                                        gameId: gameResponse.gameId,
                                        gameState: gameResponse.gameState,
                                        language: i18n.language,
                                        timeZone: timeZone
                                    })
                                    .catch(error => console.error(error));
                                setNeedPrinting(false);
                                setIsGameStarted(true);
                                setIsMessagePrinted(true);
                            }
                        })
                        .catch(error => {
                            if (!isRedirected) {
                                setIsRedirected(true);
                                handleError(error, navigate, appDispatch, setError, deleteUser);
                            }
                        });
                }
                connection.onclose(error => {
                    console.log("SignalR disconnected")
                    console.error(error);
                    connection.start()
                        .then(() => {
                            startConnection();
                            setIsReady(true);
                        })
                        .catch(error => console.error(`SignalR error: `, error));
                });

                setConnector(connection);
                connection.start()
                    .then(() => {
                        startConnection();
                        setIsReady(true);
                    })
                    .catch(error => console.error(`SignalR error: `, error));
                return () => {
                    if (connection) {
                        connection.stop().then(() => console.log("SignalR connection stopped"));
                    }
                };
            })
            .catch(error => {
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    }, []);

    const handleSendLocations = () => {
        setIsMessagePrinted(false);
        connector?.invoke('SendLocations', {language: i18n.language, gameId: game.id, timeZone: timeZone})
            .catch(error => console.error(error));
        setIsGameStarted(true);
    };

    const handleAcceptChoice = (choice: string) => {
        setNeedPrinting(true);
        setIsMessagePrinted(false);
        setMessages([...messages, {
            id: "",
            role: "user",
            content: choice,
            creationDate: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        }]);
        playAudio('/audio/random2.wav');
        switch (true) {
            case game.gameState === gameStates.withLocation: {
                console.log("startGame");
                console.log(game.id)
                connector?.invoke('StartGame', {
                    gameId: game.id,
                    location: choice,
                    language: i18n.language,
                    charName: game.charName,
                    timeZone: timeZone
                }).catch(error => console.log(error));
                break;
            }
            case game.gameState === gameStates.inProcess: {
                console.log("acceptChoice");
                connector?.invoke('AcceptChoice', {
                    gameId: game.id,
                    choice: choice,
                    language: i18n.language,
                    timeZone: timeZone
                }).catch(error => console.log(error));
                break;
            }
            default: {
                console.error("GameEnded")
                break;
            }
        }
        setVariant("");
    };

    useEffect(() => {
        if (isChatBottom)
            if (endOfChat.current) {
                endOfChat.current.scrollIntoView({behavior: 'smooth'});
            }
    }, [messages, choices, lastMessageLength, isChatBottom]);

    const handleScroll = () => {
        const div = chatRef.current;
        if (div) {
            const {scrollTop, scrollHeight, clientHeight} = div;
            const tolerance = 1;
            if (scrollHeight - scrollTop <= clientHeight + tolerance) {
                setIsChatBottom(true);
            } else {
                setIsChatBottom(false);
            }
        }
    };

    const isClientHeightLess = () => {
        const div = chatRef.current;
        if (div)
            return div.scrollHeight > div.clientHeight
        else
            return false
    };

    const handleMoveBottom = () => {
        const div = endOfChat.current;
        if (div) {
            div.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleVariantChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setVariant(value);
    };
    return (
        <div className={"gameContainer"}>
            <div className={"btnGroup1"}>
                <NavButtons/>
            </div>

            <div className={"charAvatarAndName border3Darkslateblue boxShadow"}>
                <div className={'charAvatar'}>
                    <Avatar
                        src={serverUrls.avatar + `/${game.avatarId}`}
                        margin={'10px'}
                        boxSize={'100px'}
                    />
                </div>
                <Text
                    wordBreak={'break-all'}
                    margin={'auto'}
                    paddingRight={'10px'}
                    textAlign={'center'}
                >
                    {game.charName}
                </Text>
            </div>
            <div className={'chatContainer boxShadow border3Darkslateblue'}>
                <div ref={chatRef} onScroll={handleScroll} className={'dialogContainer'}>
                    {messages.map((message, index) => {
                        return (
                            <Message
                                handleMessageLengthChanged={handleMessageLengthChanged}
                                handlePrinted={handleMessagePrinted}
                                needPrinting={needPrinting}
                                creationDate={message.creationDate}
                                isNextSame={messages[index + 1]?.role === message.role}
                                role={message.role}
                                content={message.content}
                                key={index}
                            />
                        )
                    })}
                    <div className={'choicesContainer'}>
                        {
                            isReady ?
                                isMessageInProcess || queue !== 0 ?
                                    <div className={'queueContainer'}>
                                        <Text textAlign={'center'} fontSize={'1em'}>
                                            {
                                                queue === 0 ? "" : `${t("queueStart")} ${queue} ${t("queueEnd")}`
                                            }
                                        </Text>
                                        <Spinner marginLeft={'auto'} marginRight={'auto'}/>
                                    </div> :
                                    isMessagePrinted ?
                                        <>
                                            {
                                                choices.data.map((choice, index) => {
                                                    return (
                                                        <button
                                                            className={'choiceBtn'}
                                                            onClick={() => handleAcceptChoice(choice)}
                                                            key={index}
                                                        >
                                                            <Text
                                                                lineHeight={'20px'}
                                                                textAlign={'center'}
                                                                wordBreak={'break-word'}
                                                                whiteSpace={'normal'}
                                                                fontSize={'1.2em'}
                                                            >
                                                                {choice}
                                                            </Text>
                                                        </button>
                                                    )
                                                })
                                            }
                                            <div className={'variantContainer'}>
                                                <Input
                                                    onChange={handleVariantChange}
                                                    value={variant}
                                                    placeholder={t("variant")}
                                                    width={'100%'}/>
                                                <Button
                                                    fontSize={'0.8em'}
                                                    isDisabled={variant.length === 0}
                                                    onClick={() => handleAcceptChoice(variant)}
                                                    colorScheme={"green"}
                                                >
                                                    {t("submit")}
                                                </Button>
                                            </div>
                                        </> : <></> : <Spinner marginLeft={'auto'} marginRight={'auto'}/>
                        }
                    </div>
                    <div ref={endOfChat}></div>
                </div>
                {
                    isReady ?
                        !isGameStarted ?
                            <div className={'actionButtons'}>
                                <Button
                                    height={'50px'}
                                    width={'200px'}
                                    onClick={handleSendLocations}
                                    marginTop={'10px'}
                                    marginBottom={'10px'}
                                    marginRight={'10px'}
                                    colorScheme={"green"}
                                    fontSize={'1.4em'}
                                >
                                    {t("startGame")}
                                </Button>
                            </div> : <></> : <Spinner marginLeft={'auto'} marginRight={'auto'}/>
                }
                <div className={`toBottom ${!isChatBottom && isClientHeightLess() ? "show" : ""}`}>
                    <IconButton
                        onClick={handleMoveBottom}
                        isRound={true}
                        aria-label={"to-bottom"}
                        colorScheme={"blackAlpha"}
                        icon={<MdArrowDownward size={'md'}/>}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat;