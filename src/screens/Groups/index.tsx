import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';


export default function Groups() {
  return (

    <Container>
    <Header showBackButton/>
    <Highlight
    title='Turmas'
    subtitle='Jogue com a sua turma'
    />
    <GroupCard title='Galera do ignite' onPress={()=>console.log("pressionou")} />
    </Container>
  );
}