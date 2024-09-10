import {Button, Divider, IconButton, Spinner, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {gameHistory} from "../../dto/gameHistory.ts";
import axios from "axios";
import {serverUrls} from "../../constansts/serverUrls.ts";
import {useNavigate} from "react-router-dom";
import './style.css'
import {paths} from "../../constansts/paths.ts";
import {changeLoading, deleteUser, setError, handleError} from "../../store/appStore.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import NavButtons from "../navButtons";
import {useTranslation} from "react-i18next";
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";

const History = () => {
    const appDispatch = useAppDispatch();
    const [history, setHistory] = useState<gameHistory[]>([]);
    const navigate = useNavigate();
    const appState = useAppSelector(state => state.app);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const takeCount = 10;
    const [pages, setPages] = useState<number[]>([]);
    const [isRedirected, setIsRedirected] = useState<boolean>(false);


    useEffect(() => {
        axios.get<{ pagesCount: number }>(serverUrls.historyPagesCount + `?takeCount=${takeCount}`)
            .then(response => {
                console.log(response)
                setTotalPages(response.data.pagesCount);
            })
            .catch(error => {
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    }, []);

    useEffect(() => {
        if (totalPages !== 1)
            if (pages.length === 0) {
                const array: number[] = [];
                for (let i = 1; i <= totalPages; i++) {
                    array.push(i);
                }
                setPages(array);
            }
    }, [pages, totalPages]);

    useEffect(() => {
        appDispatch(changeLoading(true));
        axios.get<gameHistory[]>(serverUrls.history + `?currentPage=${currentPage}&takeCount=${takeCount}`,
            {headers: {'Time-Zone': timeZone}})
            .then(response => {
                setHistory(response.data);
                appDispatch(changeLoading(false));
            })
            .catch(error => {
                appDispatch(changeLoading(false));
                if (!isRedirected) {
                    setIsRedirected(true);
                    handleError(error, navigate, appDispatch, setError, deleteUser);
                }
            });
    }, [currentPage]);

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleContinueGame = (id: string) => {
        navigate(paths.chat + `/${id}`);
    };
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
                {t("history")}
            </Text>
            <div className={'boxShadow border3Darkslateblue historyListContainer'}>
                <Text
                    fontSize={'0.8em'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    marginBottom={'5px'}
                >
                    {`${t("page")}: ${currentPage}`}
                </Text>
                <div className={'historyTable tableBottomBorder'}>
                    <Text
                        fontSize={'1.4em'}
                        flex={0.5}
                        textAlign={'center'}
                        margin={'auto'}
                    >
                        {t("game")}
                    </Text>
                    <Divider orientation='vertical'/>
                    <Text
                        fontSize={'1.4em'}
                        flex={0.5}
                        textAlign={'center'}
                        margin={'auto'}
                    >
                        {t("gameCreationDate")}
                    </Text>
                </div>
                {
                    appState.isLoading ?
                        <Spinner
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        /> :
                        history.map((e, index) => {
                            return (
                                <div
                                    className={`historyTable ${index === history.length - 1 ? '' : 'tableBottomBorder'}`}
                                    key={index}>
                                    <div className={'gameButton'}>
                                        <Button
                                            onClick={() => handleContinueGame(e.id)}
                                            colorScheme={"green"}
                                            margin={'auto'}
                                        >{e.name.length < 11 ? e.name : `${e.name.slice(0, 7)}...`}
                                        </Button>
                                    </div>
                                    <Divider orientation='vertical'/>
                                    <Text
                                        flex={0.5}
                                        textAlign={'center'}
                                        margin={'auto'}
                                    >{e.creationDate}
                                    </Text>

                                </div>
                            )
                        })
                }
                {
                    totalPages > 1 ?
                        <div className={'historyPagination'}>
                            <IconButton
                                onClick={handlePrevious}
                                isDisabled={currentPage === 1}
                                colorScheme={"green"}
                                icon={<MdArrowBackIosNew size={'20'}/>}
                                aria-label={"prev"}
                            />
                            {
                                pages.length < 4 ?
                                    pages.map((page, index) => {
                                        return (
                                            <Button
                                                variant={currentPage === page ? "solid" : "outline"}
                                                colorScheme={"green"}
                                                onClick={() => setCurrentPage(page)}
                                                key={index}
                                            >
                                                {page}
                                            </Button>
                                        )
                                    }) :
                                    <>
                                        <Button
                                            variant={currentPage === 1 ? "solid" : "outline"}
                                            colorScheme={"green"}
                                            onClick={() => setCurrentPage(pages[0])}
                                        >
                                            1
                                        </Button>
                                        <Text
                                            marginTop={'auto'}
                                            marginBottom={'auto'}
                                            textAlign={"center"}
                                        >
                                            ...
                                        </Text>
                                        <Button
                                            variant={currentPage === pages.length ? "solid" : "outline"}
                                            colorScheme={"green"}
                                            onClick={() => setCurrentPage(pages[pages.length - 1])}
                                        >
                                            {pages[pages.length - 1]}
                                        </Button>
                                    </>
                            }
                            <IconButton
                                onClick={handleNext}
                                isDisabled={currentPage === pages.length}
                                colorScheme={"green"}
                                icon={<MdArrowForwardIos size={'20'}/>}
                                aria-label={"next"}
                            />
                        </div> : <></>
                }
            </div>
        </div>
    )
}

export default History;