import {useTranslation} from "react-i18next";
import {
    Button, Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Text, useDisclosure
} from "@chakra-ui/react";
import './style.css'
import Enter from "../enter";
import {useState} from "react";
import Registration from "../registration";

const Welcome = () => {
    const {t} = useTranslation();
    const [actionContent, setActionContent] = useState<string | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const actions = {enter: t("actions.enter"), register: t("actions.registration")}

    const handleAction = (content: string) => {
        setActionContent(content);
        onOpen();
    };

    return (
        <>
            <div className={'baitsContainer'}>
                <div className={"mainDescription boxShadow border3Darkslateblue"}>
                    <Text
                        userSelect={'none'}
                    >
                        {t('mainDescription')}
                    </Text>
                </div>
                <div className={"description boxShadow border3Darkslateblue"}>
                    <Text
                        userSelect={'none'}
                    >
                        {t('description1')}
                    </Text>
                </div>
                <div className={"description boxShadow border3Darkslateblue"}>
                    <Text
                        userSelect={'none'}
                    >
                        {t('description2')}
                    </Text>
                </div>
                <div className={"description boxShadow border3Darkslateblue"}>
                    <Text
                        userSelect={'none'}
                    >
                        {t('description3')}
                    </Text>
                </div>
                <div className={"description boxShadow border3Darkslateblue"}>
                    <Text
                        userSelect={'none'}
                    >
                        {t('description4')}
                    </Text>
                </div>
                <div className={'joinButtonsContainer'}>
                    <Button
                        margin={'auto'}
                        className={"boxShadow"}
                        fontSize={'1.3em'}
                        colorScheme={'green'}
                        onClick={() => handleAction(actions.register)}
                    >
                        {t('actions.registration')}
                    </Button>
                    <Button
                        margin={'auto'}
                        fontSize={'1.3em'}
                        className={"boxShadow"}
                        colorScheme={'green'}
                        onClick={() => handleAction(actions.enter)}
                    >
                        {t('actions.enter')}
                    </Button>
                </div>
            </div>
            <Drawer
                blockScrollOnMount={false}
                isOpen={isOpen}
                placement='top'
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
                        {actionContent}
                    </DrawerHeader>
                    <Divider margin={'auto'}  width={'50%'}/>
                    <DrawerBody
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'start'}
                        gap={'15px'}
                    >
                        {actionContent === actions.enter ? <Enter/> : <Registration/>}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Welcome;