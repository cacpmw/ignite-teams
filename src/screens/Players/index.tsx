import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { HeaderList, NumberOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@exceptions/AppError";
import {
    createPlayerByGroupOnLocalStorage,
    getPlayersByGroupAndTeamFromLocalStorage,
    removePlayerByGroupFromLocalStorage
} from "@storage/players/playersStorage";
import { removeGroupByNameFromLocalStorage } from "@storage/group/groupStorage";
import { Loading } from "@components/Loading";
interface RouteParameters {
    group: string;
}

export default function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState("Team A")
    const [players, setPlayers] = useState<{ name: string; team: string }[]>([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParameters;
    const newPlayerNameInputRef = useRef<TextInput>(null);
    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("New Player", "Enter a player name");
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }
        try {
            await createPlayerByGroupOnLocalStorage(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            getPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("New Player", error.message);
            } else {
                Alert.alert("New Player", "Unable to create");
                console.log(error);
            }
        }
    }
    async function getPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await getPlayersByGroupAndTeamFromLocalStorage(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Players", "Unable to load players");
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    }
    async function handlePlayerRemove(playerName: string) {
        try {
            await removePlayerByGroupFromLocalStorage(playerName, group);
            console.log("player removed");
            getPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Players", "Unable to remove player");
                console.log(error);
            }
        }
    }
    async function removeGroup() {
        try {
            await removeGroupByNameFromLocalStorage(group);
            navigation.navigate("groups");
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Players", "Unable to remove group");
                console.log(error);
            }
        }
    }
    async function handleGroupRemove() {
        Alert.alert(
            "Remove group",
            "Are you sure?",
            [
                { text: "Yes", onPress: () => { removeGroup() } },
                { text: "No", style: "cancel" }
            ]
        );
        ;
    }
    /**updates players list every time a new player is added */
    useEffect(() => {
        console.log("Players Screen: useEffect with Team dependency");
        getPlayersByTeam();
        //newPlayerNameInputRef.current?.focus();
    }, [team]);
    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="Separate your mates by teams" />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    placeholder="Player name"
                    autoCorrect={false}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon onPress={handleAddPlayer} icon="add" />
            </Form>
            <HeaderList>
                <FlatList
                    horizontal
                    data={["Team A", "Team B"]}
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
            {
                isLoading ? <Loading /> :

                    <FlatList data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => handlePlayerRemove(item.name)}
                            />
                        )}
                        ListEmptyComponent={<ListEmpty message='No players' />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            players.length === 0 && { flex: 1 }
                        ]}

                    />
            }
            <Button
                text="Remove Group"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />


        </Container>
    )
}