import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/Input";


export default function Players() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome do grupo" subtitle="Adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" />
            </Form>
        </Container>
    )
}