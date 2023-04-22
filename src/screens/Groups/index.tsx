import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { all as getGroupsFromLocalStorage } from '@storage/group/groupStorage';


export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });

  }
  function handleNewGroup() {
    navigation.navigate("new");
  }
  async function getGroupsFromStorage() {
    try {
      const data = await getGroupsFromLocalStorage();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }
  /**This hook executes every time a screen
   * refocus
   */
  useFocusEffect(useCallback(() => {
    console.log("Groups Screen: useFocusEffect");
    getGroupsFromStorage();
  }, []));
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
            onPress={()=>{handleOpenGroup(item)}}
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