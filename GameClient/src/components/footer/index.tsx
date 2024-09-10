import './style.css'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {MdLanguage} from "react-icons/md";
import {useTranslation} from 'react-i18next';
import { FiCheckCircle } from "react-icons/fi";

const Footer = () => {
    const {t, i18n} = useTranslation();
    const languages = {
        en: "en",
        ru: "ru-Ru"
    }
    const {isOpen, onOpen, onClose} = useDisclosure()


    const handleGoToOpenAI = () => {
        window.open("https://developers.sber.ru/portal/products/gigachat-api", '_blank');
    };
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language)
            .then();
        onClose();
    };
    return (
        <div className={'appFooter'}>
            <Button
                className={'boxShadow'}
                margin={0}
                colorScheme={'teal'}
                onClick={handleGoToOpenAI}
                leftIcon={<FiCheckCircle />}
                height={'auto'}
                padding={'10px'}
                fontSize={'20px'}
            >
                {t('linkToOpenAI')}
            </Button>
            <Button
                className={'boxShadow'}
                margin={0}
                colorScheme={'teal'}
                onClick={onOpen}
                leftIcon={<MdLanguage/>}
                height={'auto'}
                padding={'10px'}
                fontSize={'20px'}
            >
                {t('currentLanguage')}
            </Button>
            <Drawer
                blockScrollOnMount={false}
                isOpen={isOpen}
                placement='bottom'
                onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        fontSize={'2em'}
                    >
                        {t('chooseLanguage')}
                    </DrawerHeader>

                    <DrawerBody
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        gap={'15px'}
                    >
                        <Button
                            width={'max-content'}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            onClick={() => handleLanguageChange(languages.en)}
                        >
                            {t('languages.en')}
                        </Button>
                        <Button
                            width={'max-content'}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            onClick={() => handleLanguageChange(languages.ru)}
                        >
                            {t('languages.ru')}
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Footer;