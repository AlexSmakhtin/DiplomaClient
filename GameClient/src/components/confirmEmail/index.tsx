import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Spinner, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {confirmEmail, deleteUser, handleError, setError} from "../../store/appStore.ts";
import {paths} from "../../constansts/paths.ts";

const ConfirmEmail = () => {
    const appDispatch = useAppDispatch();
    const {token} = useParams<{ token: string }>();
    const isLoading = useAppSelector(state => state.app.isLoading);
    const navigate = useNavigate();
    const {t} = useTranslation();
    useEffect(() => {
        if (token !== undefined)
            appDispatch(confirmEmail(token))
                .then(result => {
                    if (confirmEmail.fulfilled.match(result)) {
                        navigate(paths.menu);
                    } else if (confirmEmail.rejected.match(result)) {
                        const error = result.payload;
                        handleError(error as { message: string; code: number }, navigate, appDispatch, setError, deleteUser);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
    }, [token]);

    return (
        <div className={'gameContainer'}>
            {
                isLoading ?
                    <Spinner boxSize={'100px'} margin={'auto'}/> :
                    <Text
                        className={'boxShadow border3Darkslateblue'}
                        fontSize={'1.5em'}
                        textAlign={'center'}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        padding={'10px'}
                    >
                        {t("emailConfirmed")}
                    </Text>
            }
        </div>
    )
}

export default ConfirmEmail;