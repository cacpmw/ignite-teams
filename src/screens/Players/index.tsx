import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";


export default function Players(){
    return(
        <Container>
            <Header showBackButton />
            <Highlight title="Nome do grupo" subtitle="Adicione a galera e separe os times"/>
        </Container>
    )
}