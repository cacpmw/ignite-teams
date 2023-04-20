import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';


export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate("new");
  }
  return (

    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />

        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={<ListEmpty message='Nenhuma turma' />}
      />
      <Button
        text='Nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}