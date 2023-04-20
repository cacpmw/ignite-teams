import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export default function NewGroup() {
    const [group, setGroup] = useState("");
    const navigation = useNavigation();
    function handleNew() {
        navigation.navigate("players",{group /**group: group */});
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
                <Input
                placeholder="Nome da turma"
                onChangeText={setGroup /* text => setGroup(text) */}
                />
                <Button
                    text="Criar"
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}