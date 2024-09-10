import {Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {paths} from "../../constansts/paths.ts";
import NavButtons from "../navButtons";

const HowToPlay = () => {
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
                className={"boxShadow border3Darkslateblue"}>
                {t("howToPlay")}
            </Text>
            <div className={'boxShadow border3Darkslateblue'}>
                <Text
                    fontSize={'1.4em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    <b>{t("gameRules.title1")}</b>
                </Text>
                <Text
                    fontSize={'1.3em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t('gameRules.text1')}
                </Text>
                <Text
                    fontSize={'1.1em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t("gameRules.rule1")}
                </Text>
                <Text
                    fontSize={'1.1em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t("gameRules.rule2")}
                </Text>
                <Text
                    fontSize={'1.3em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t('gameRules.text2')}
                </Text>
                <Text
                    fontSize={'1.1em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t("gameRules.rule3")}
                </Text>
                <Text
                    fontSize={'1.1em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t("gameRules.rule4")}
                </Text>
                <Text
                    fontSize={'1.4em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    <b>{t('gameRules.text3')}</b>
                </Text>
                <Text
                    fontSize={'1.1em'}
                    padding={'10px'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign={'center'}
                >
                    {t("gameRules.rule5")}&nbsp;
                    <a href={paths.userAgreement}>
                        <u>{t("gameRules.rule6")}</u>
                    </a>.
                </Text>
            </div>
        </div>
    )
}

export default HowToPlay;