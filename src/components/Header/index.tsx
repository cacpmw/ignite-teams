import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import logoImage from '@assets/logo.png';

interface HeaderProps{
    showBackButton?: boolean;
}

export function Header({showBackButton = false}:HeaderProps){
    const navigation = useNavigation();
    function handleGoHome(){
        navigation.navigate("groups");
    }

    return(
        <Container>
           { showBackButton &&
            <BackButton onPress={handleGoHome}>
            <BackIcon/>
            </BackButton>}
            <Logo source={logoImage} />
        </Container>
    )

 }