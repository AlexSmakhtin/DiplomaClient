import NavButtons from "../navButtons";
import {Divider, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import './style.css'
import {SiGithub, SiGoogle, SiTelegram} from "react-icons/si";

const Author = () => {
    const {t} = useTranslation();

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
                fontSize={"1.5em"}
                textAlign={"center"}
                className={"boxShadow border3Darkslateblue"}
            >
                {t("author")}
            </Text>
            <div className={'boxShadow border3Darkslateblue'}>
                <div className={'linkContainer'}>
                    <SiGithub size={'45px'}/>
                    <Text
                        margin={'auto'}
                        textAlign={'center'}
                    >
                        GitHub:&nbsp;
                        <a href={'https://github.com/AlexSmakhtin'}>
                            <u>https://github.com/AlexSmakhtin</u>
                        </a>
                    </Text>
                </div>
                <Divider
                    margin={'auto'}
                    width={'90%'}
                />
                <div className={'linkContainer'}>
                    <SiGoogle
                        size={'45px'}/>

                    <Text
                        margin={'auto'}
                        textAlign={'center'}
                    >
                        Gmail: lokomotiv96000@gmail.com
                    </Text>
                </div>
                <Divider
                    margin={'auto'}
                    width={'90%'}
                />
                <div className={'linkContainer'}>
                    <SiTelegram
                        size={'45px'}/>
                    <Text
                        margin={'auto'}
                        textAlign={'center'}
                    >
                        Telegram:&nbsp;
                        <a href={'https://t.me/chevapchich12'}>
                            <u>https://t.me/chevapchich12</u>
                        </a>
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Author;