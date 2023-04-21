import { AppError } from "@exceptions/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";


export async function createPlayerByGroup(newPlayer: { name: string; team: string; }, group: string) {
    try {
        const storedPlayers = await getPlayersByGroup(group);
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

export async function getPlayersByGroup(group: string): Promise<{ name: string; team: string }[]> {
    try {
        const storedPlayers = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: { name: string; team: string }[] = storedPlayers ? JSON.parse(storedPlayers) : [];
        return players;

    } catch (error) {
        throw error;
    }
}