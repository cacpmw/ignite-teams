import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Name, Icon } from "./styles";

interface PlayerCardComponentProps {
    name:string;
    onRemove?: ()=>{};
}

export function PlayerCard({name, onRemove}: PlayerCardComponentProps){
    return(
        <Container>
            <Icon name="person" />
            <Name>
                {name}
            </Name>
            <ButtonIcon icon="close" type="SECONDARY" onPress={()=>{}} />
        </Container>
    );
}