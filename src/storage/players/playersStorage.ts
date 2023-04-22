import { AppError } from "@exceptions/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";


export async function createPlayerByGroupOnLocalStorage(newPlayer: { name: string; team: string; }, group: string): Promise<void> {
    try {
        const storedPlayers = await getPlayersByGroupFromLocalStorage(group);
        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);
        if (playerAlreadyExists.length > 0) {
            throw new AppError("Player already exists.");
        }
        const stringfiedPlayer = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, stringfiedPlayer);
    } catch (error) {
        throw error;

    }
}

export async function getPlayersByGroupAndTeamFromLocalStorage(group: string, team: string): Promise<{ name: string; team: string }[]> {
    try {
        const storedPlayers = await getPlayersByGroupFromLocalStorage(group);
        const players = storedPlayers.filter(player => player.team === team);
        return players;
    } catch (error) {
        throw error;
    }

}

export async function getPlayersByGroupFromLocalStorage(group: string): Promise<{ name: string; team: string }[]> {
    try {
        const storedPlayers = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: { name: string; team: string }[] = storedPlayers ? JSON.parse(storedPlayers) : [];
        return players;

    } catch (error) {
        throw error;
    }
}

export async function removePlayerByGroupFromLocalStorage(playerName: string, group: string): Promise<void> {

    try {
        const storedPlayers = await getPlayersByGroupFromLocalStorage(group);
        const filteredPlayers = storedPlayers.filter(player => player.name !== playerName);
        const stringfiedPlayer = JSON.stringify(filteredPlayers);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, stringfiedPlayer);
    } catch (error) {

    }
}