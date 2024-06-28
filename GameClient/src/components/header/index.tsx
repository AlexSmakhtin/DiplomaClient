import './style.css'
import {Text} from "@chakra-ui/react";

const Header = () => {
    return (
        <div className={'appHeaderContainer'}>
            <Text
                width={'max-content'}
                display={'flex'}
                flexDirection={'column'}
                userSelect={'none'}
                className={'boxShadow border6Darkslateblue'}
                marginTop={'20px'}
                marginLeft={'auto'}
                marginRight={'auto'}
                marginBottom={'auto'}
                textAlign={'center'}
                lineHeight={'50px'}
                paddingTop={'26px'}
                paddingLeft={'20px'}
                paddingRight={'20px'}
                paddingBottom={'10px'}
            >
                AI ADVENTURE
            </Text>
        </div>
    );
}

export default Header;