import './style.css'
import {Route, Routes} from "react-router-dom";
import {paths} from "../../constansts/paths.ts";
import Welcome from "../welcome";

const Content = () => {

    return (
        <div className={'appContent'}>
            <Routes>
                <Route path={paths.default} element={<Welcome/>}/>
                <Route path={paths.welcome} element={<Welcome/>}/>
            </Routes>

        </div>
    );
}

export default Content;