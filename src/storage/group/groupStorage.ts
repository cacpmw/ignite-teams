import { AppError } from "@exceptions/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAllPlayersByGroupFromLocalStorage } from "@storage/players/playersStorage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function storeGroupOnLocalStorage(newGroup: string) {
    try {
        const storedGroups = await getGroupsFromLocalStorage();
        const groupAlreadyExists = storedGroups.includes(newGroup);
        if (groupAlreadyExists) {
            throw new AppError("Group already exists.");
        }
        const stringfiedGroups = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, stringfiedGroups);
    } catch (error) {
        throw error;
    }
}

export async function getGroupsFromLocalStorage(): Promise<string[]> {

    try {
        const storedGroups = await AsyncStorage.getItem(GROUP_COLLECTION);
        const groups: string[] = storedGroups ? JSON.parse(storedGroups) : [];
        return groups;

    } catch (error) {
        throw error;
    }

}

export async function removeGroupByNameFromLocalStorage(group: string): Promise<void> {
    try {
        const storedGroups = await getGroupsFromLocalStorage();
        const filteredGroups = storedGroups.filter(currentGroup => currentGroup !== group);


        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroups));
        await removeAllPlayersByGroupFromLocalStorage(group);
    } catch (error) {
        throw error;
    }

}