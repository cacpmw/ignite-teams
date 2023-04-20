import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { HeaderList, NumberOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";


export default function Players() {
    const [team, setTeam] = useState("Time A")
    const [players, setPlayers] = useState([]);
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome do grupo" subtitle="Adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" />
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
            renderItem={({item})=>(
                <PlayerCard name={item}/>
            )}
            ListEmptyComponent={<ListEmpty message='Nenhum jogador' />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
                { paddingBottom: 100 },
                players.length===0 && {flex:1}
            ]}

            />
            <Button text="Remover Turma" type="SECONDARY"/>


        </Container>
    )
}