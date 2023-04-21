import { AppError } from "@exceptions/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function create(newGroup: string) {
    try {
        const storedGroups = await all();
        const groupAlreadyExists = storedGroups.includes(newGroup);
        if(groupAlreadyExists){
            throw new AppError("Group already exists.");    
        }
        const stringfiedGroups = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, stringfiedGroups);
    } catch (error) {
        throw error;
    }
}

export async function all(): Promise<string[]> {

    try {
        const storedGroups = await AsyncStorage.getItem(GROUP_COLLECTION);
        const groups: string[] = storedGroups ? JSON.parse(storedGroups) : [];
        return groups;

    } catch (error) {
        throw error;
    }

}