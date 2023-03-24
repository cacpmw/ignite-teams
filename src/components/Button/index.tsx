import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps{
    type?: ButtonTypeStyleProps;
    text: string;
}

export function Button({type = "PRIMARY", text, ...rest}:ButtonProps){
    return(
        <Container type={type} {...rest} >
            <Title>{text}</Title>
        </Container>
    )
}