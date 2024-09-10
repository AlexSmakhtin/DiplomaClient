import './style.css'
import {Text} from "@chakra-ui/react";

const Header = () => {
    return (
        <div className={'appHeaderContainer'}>
            <div className={"textHeaderContainer boxShadow border6Darkslateblue"}>
                <Text
                    translate={'no'}
                    userSelect={'none'}
                    paddingTop={"10px"}>
                    AI ADVENTURE
                </Text>
            </div>
        </div>
    );
}

export default Header;