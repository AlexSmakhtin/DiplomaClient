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
import {AiFillOpenAI} from "react-icons/ai";
import {useTranslation} from 'react-i18next';

const Footer = () => {
    const {t, i18n} = useTranslation();
    const languages = {
        en: "en",
        ru: "ru"
    }
    const {isOpen, onOpen, onClose} = useDisclosure()


    console.log(i18n.language)
    const handleGoToOpenAI = () => {
        window.open("https://openai.com", '_blank');
    };
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language)
            .then();
        onClose();
    };
    return (
        <div className={'appFooter'}>
            <Button
                margin={0}
                borderRadius={'10px'}
                colorScheme={'green'}
                onClick={handleGoToOpenAI}
                leftIcon={<AiFillOpenAI/>}
                height={'auto'}
                padding={'10px'}
                fontSize={'20px'}
            >
                {t('linkToOpenAI')}
            </Button>
            <Button
                margin={0}
                borderRadius={'10px'}
                colorScheme={'green'}
                onClick={onOpen}
                leftIcon={<MdLanguage/>}
                height={'auto'}
                padding={'10px'}
                fontSize={'20px'}
            >
                {t('currentLanguage')}
            </Button>
            <Drawer
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