import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';


export default function Groups() {
  const  [groups, setGroups] = useState<string[]>(["Turma 1","Amigos"]);
  return (

    <Container>
    <Header showBackButton/>
    <Highlight
    title='Turmas'
    subtitle='Jogue com a sua turma'
    />

    <FlatList
      showsVerticalScrollIndicator={false}
      data={groups}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) =>(
        <GroupCard 
          title={item} 
        />

      )}
      contentContainerStyle={groups.length ===0 &&{flex: 1}}
      ListEmptyComponent={<ListEmpty message='Nenhuma turma' />}
    />
    </Container>
  );
}