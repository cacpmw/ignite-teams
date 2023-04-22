import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import Input from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { storeGroupOnLocalStorage } from "@storage/group/groupStorage";
import { AppError } from "@exceptions/AppError";
import { Alert } from "react-native";


export default function NewGroup() {
    const [group, setGroup] = useState("");
    const navigation = useNavigation();
    async function handleNew() {
        try {
            if(group.trim().length===0){
                return Alert.alert("New Group", "Enter a group name");
            }
            await storeGroupOnLocalStorage(group);
            navigation.navigate("players", { group /**group: group */ });

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("New Group", error.message);
            } else {
                Alert.alert("New Group", "Unable to create");
                console.log(error);
            }
        }
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