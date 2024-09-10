import './style.css'
import {Route, Routes} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import Welcome from "../welcome";
import Menu from "../menu";
import Error from "../error";
import NewGame from "../newGame";
import SetAvatar from "../setAvatar";
import Chat from "../chat";
import History from "../history";
import UserAgreement from "../userAgreement";
import Account from "../account";
import Author from "../author";
import ConfirmEmail from "../confirmEmail";
import HowToPlay from "../howToPlay";

const Content = () => {
    return (
        <div className={'appContent'}>
            <Routes>
                <Route path={paths.default} element={<Welcome/>}/>
                <Route path={paths.welcome} element={<Welcome/>}/>
                <Route path={paths.howToPlay} element={<HowToPlay/>}/>
                <Route path={paths.menu} element={<Menu/>}/>
                <Route path={paths.confirmEmail} element={<ConfirmEmail/>}/>
                <Route path={paths.newGame} element={<NewGame/>}/>
                <Route path={paths.avatarWithGameId} element={<SetAvatar/>}/>
                <Route path={paths.chatWithId} element={<Chat/>}/>
                <Route path={paths.history} element={<History/>}/>
                <Route path={paths.account} element={<Account/>}/>
                <Route path={paths.userAgreement} element={<UserAgreement/>}/>
                <Route path={paths.author} element={<Author/>}/>
                <Route path={paths.error} element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default Content;