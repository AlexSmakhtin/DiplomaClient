import {useTranslation} from "react-i18next";
import {Button, Text} from "@chakra-ui/react";
import './style.css'

const Welcome = () =>{
    const {t} = useTranslation();

    const handleTryForFree = () => {

    };
    const handleSubscribe = () => {

    };
    return(
        <>
            <Text
                width={'max-content'}
                marginRight={'auto'}
                marginLeft={'auto'}
                className={'boxShadow border3Darkslateblue'}
                height={'max-content'}
                padding={'20px'}
                marginTop={0}
                marginBottom={0}
                fontSize={'40px'}
            >
                {t('mainDescription')}
            </Text>
            <div className={'baitsContainer'}>
                <Text
                    className={'boxShadow border3Darkslateblue'}
                    width={'max-content'}
                    padding={'15px'}>
                    {t('description1')}
                </Text>
                <Text
                    className={'boxShadow border3Darkslateblue'}
                    width={'max-content'}
                    padding={'15px'}>
                    {t('description2')}
                </Text>
                <Text
                    className={'boxShadow border3Darkslateblue'}
                    width={'max-content'}
                    padding={'15px'}>
                    {t('description3')}
                </Text>
                <Text
                    className={'boxShadow border3Darkslateblue'}
                    width={'max-content'}
                    padding={'15px'}>
                    {t('description4')}
                </Text>
            </div>
            <div className={'joinButtonsContainer'}>
                <Button
                    margin={'auto'}
                    borderRadius={'10px'}
                    colorScheme={'pink'}
                    onClick={handleTryForFree}
                    height={'auto'}
                    padding={'15px'}
                    fontSize={'30px'}
                    width={'max-content'}
                >
                    {t('joinButtons.btn1')}
                </Button>
                <Button
                    margin={'auto'}
                    borderRadius={'10px'}
                    colorScheme={'pink'}
                    onClick={handleSubscribe}
                    height={'auto'}
                    padding={'15px'}
                    fontSize={'30px'}
                    width={'max-content'}
                >
                    {t('joinButtons.btn2')}
                </Button>
                <Button
                    margin={'auto'}
                    borderRadius={'10px'}
                    colorScheme={'pink'}
                    onClick={handleSubscribe}
                    height={'auto'}
                    padding={'15px'}
                    fontSize={'30px'}
                    width={'max-content'}
                >
                    {t('joinButtons.btn3')}
                </Button>
            </div>
        </>
    )
}

export default Welcome;