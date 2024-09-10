import React, {useEffect, useState} from "react";
import {
    Box, Divider,
    IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
    ResponsiveValue,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import './style.css'
import {MdInsertPhoto, MdOutlinePauseCircle, MdOutlinePlayCircle} from "react-icons/md";
import axios from "axios";
import {serverUrls} from "../../constansts/serverUrls.ts";
import {useTranslation} from "react-i18next";

interface MessageProps {
    role: string,
    content: string,
    creationDate: string,
    isNextSame: boolean,
    needPrinting: boolean,
    handlePrinted: () => void,
    handleMessageLengthChanged: (value: number) => void;
}

const Message: React.FC<MessageProps> = ({
                                             role,
                                             content,
                                             creationDate,
                                             isNextSame,
                                             needPrinting,
                                             handlePrinted,
                                             handleMessageLengthChanged
                                         }) => {
    const [message, setMessage] = useState<string>("");
    const [messageStyle, setMessageStyle] = useState<string>();
    const [textAlign, setTextAlign] = useState<ResponsiveValue<CanvasTextAlign>>();
    const [messageColor, setMessageColor] = useState<string>();
    const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const {t} = useTranslation();
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [audioSrc, setAudioSrc] = useState<string>("");
    const {i18n} = useTranslation();
    const [index, setIndex] = useState(0);
    const [imageId, setImageId] = useState<string>("");
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        handleMessageLengthChanged(message.length);
    }, [message]);

    useEffect(() => {
        if (needPrinting) {
            if (index < content.length) {
                const timeoutId = setTimeout(() => {
                    setMessage((prev) => prev + content[index]);
                    setIndex(index + 1);
                }, 50);

                return () => clearTimeout(timeoutId);
            }
            if (role !== "user")
                if (content.length > 0) {
                    if (index === content.length) {
                        console.log("printed");
                        handlePrinted();
                    }
                }
        } else {
            setIndex(content.length + 1);
            setMessage(content);
        }
    }, [index, needPrinting]);

    useEffect(() => {
        const last = isNextSame === true ? "" : "Last"
        setMessageStyle(role === "user" ? "userMessage" + last : "assistantMessage" + last);
        setTextAlign(role === "user" ? "right" : "left");
        setMessageColor(role === "user" ? "messageColorUser" : "messageColorAi");
    }, []);

    const handleContentVoiceOver = () => {
        if (isAudioPlaying) {
            if (audio != undefined) {
                audio.pause();
            }
        } else {
            if (audio != undefined) {
                audio.play().then(() => setIsAudioPlaying(true));
            } else {
                const language = i18n.language;
                setIsAudioLoading(true);
                axios.post(serverUrls.voiceOver + `?language=${language}`, content, {responseType: 'blob'})
                    .then(response => {
                        setIsAudioLoading(false);
                        const blob = new Blob([response.data], {type: 'audio/mp3'});
                        const url = URL.createObjectURL(blob);
                        setAudio(new Audio());
                        setAudioSrc(url);
                    })
                    .catch(error => {
                        setIsAudioLoading(false);
                        console.error(error)
                    });
            }
        }
    };

    useEffect(() => {
        if (audio != undefined) {
            if (audioSrc != "") {
                audio.src = audioSrc;
                audio.onpause = () => {
                    setIsAudioPlaying(false);
                };
                audio.onended = () => {
                    setIsAudioPlaying(false);
                    setAudio(undefined);
                    setAudioSrc("");
                };
                audio.play().then(() => setIsAudioPlaying(true));
            }
        }
    }, [audio, audioSrc]);

    const handleGenerateImage = () => {
        setIsImageLoading(true);
        if (imageId) {
            setIsImageLoading(false);
            onOpen();
        } else {
            axios.post<{ imageId: string }>(serverUrls.generateImage, {description: content})
                .then(response => {
                    setIsImageLoading(false);
                    setImageId(response.data.imageId);
                    onOpen();
                })
                .catch(error => {
                    setIsImageLoading(false);
                    console.error(error)
                });
        }
    };
    return (
        <div className={messageStyle}>
            <div className={"messageContent " + messageColor}>
                <div className={'messageHeader'}>
                    <Text
                        marginTop={'auto'}
                        marginBottom={'auto'}
                        fontSize={'0.8em'}
                        textAlign={textAlign}
                    >
                        {role === "user" ? "" : "Assistant"}
                    </Text>
                    {
                        role === "user" ? <></> :
                            <>
                                <IconButton
                                    title={t("voiceOver")}
                                    isLoading={isAudioLoading}
                                    onClick={handleContentVoiceOver}
                                    size={'s'}
                                    margin={0}
                                    padding={0}
                                    backgroundColor={'transparent'}
                                    boxSize={'30px'}
                                    isRound={true}
                                    icon={isAudioPlaying ? <MdOutlinePauseCircle size={'xs'}/> :
                                        <MdOutlinePlayCircle size={'xs'}/>}
                                    aria-label={"playSound"}
                                />
                                <IconButton
                                    title={t("generateImage")}
                                    isLoading={isImageLoading}
                                    onClick={handleGenerateImage}
                                    size={'s'}
                                    margin={0}
                                    padding={0}
                                    backgroundColor={'transparent'}
                                    boxSize={'30px'}
                                    isRound={true}
                                    icon={<MdInsertPhoto size={'xs'}/>}
                                    aria-label={"playSound"}
                                />
                            </>
                    }
                </div>
                <Text
                    wordBreak={'break-word'}
                    fontSize={'1.1em'}
                >
                    {role === "user" ? content : message}
                </Text>
                <Text
                    textAlign={textAlign}
                    fontSize={'0.6em'}
                >
                    {creationDate}
                </Text>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>{t("generatedImage")}</ModalHeader>
                        <ModalCloseButton/>
                        <Divider orientation={'horizontal'}/>
                        <ModalBody>
                            <Box height={'auto'} width={'auto'}>
                                <Image
                                    borderRadius={'10px'}
                                    src={serverUrls.avatar + `/${imageId}`}
                                    alt='Dan Abramov'
                                />
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default Message;