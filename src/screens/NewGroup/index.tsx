import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";


export default function NewGroup() {

    const navigation = useNavigation();
    function handleNew() {
        navigation.navigate("players",{group:"Rocket"});
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar pessoas"
                />
                <Input placeholder="Nome da turma" />
                <Button
                    text="Criar"
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}