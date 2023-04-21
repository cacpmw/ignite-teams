import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList } from "react-native";
import { useState } from "react";
import { HeaderList, NumberOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@exceptions/AppError";
import {
    createPlayerByGroup as createPlayerByGroupOnLocalStorage,
    getPlayersByGroup as getPlayersByGroupFromLocalStorage
} from "@storage/players/playersStorage";
interface RouteParameters {
    group: string;
}

export default function Players() {
    const [player, setPlayer] = useState("");
    const [team, setTeam] = useState("Time A")
    const [players, setPlayers] = useState([]);
    const route = useRoute();
    const { group } = route.params as RouteParameters;

    async function handleAddPlayer() {
        if (player.trim().length === 0) {
            return Alert.alert("New Player", "Enter a player name");
        }
        const newPlayer = {
            name: player,
            team,
        }
        try {
            await createPlayerByGroupOnLocalStorage(newPlayer, group);
            const players = await getPlayersByGroupFromLocalStorage(group);
            console.log(players);
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("New Player", error.message);
            } else {
                Alert.alert("New Player", "Unable to create");
                console.log(error);
            }
        }
    }
    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="Adicione a galera e separe os times" />
            <Form>
                <Input onChangeText={setPlayer} placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon onPress={handleAddPlayer} icon="add" />
            </Form>
            <HeaderList>
                <FlatList
                    horizontal
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>
            <FlatList data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard name={item} />
                )}
                ListEmptyComponent={<ListEmpty message='Nenhum jogador' />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}

            />
            <Button text="Remover Turma" type="SECONDARY" />


        </Container>
    )
}