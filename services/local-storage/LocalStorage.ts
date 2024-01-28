import AsyncStorage from "@react-native-async-storage/async-storage";

import { generateUuid } from "../../util/generateUuid";

export class LocalStorage {
	async storeData(data: string, key?: string): Promise<void> {
		const itemId = key ? key : generateUuid();
		await AsyncStorage.setItem(itemId, data);
	}

	async getRecord<T>(key: string): Promise<T | void> {
		const data = await AsyncStorage.getItem(key);
		if (!data) return undefined;

		return JSON.parse(data) as T;
	}

	async getAllKeys(): Promise<string[]> {
		return (await AsyncStorage.getAllKeys()) as string[];
	}

	async getMultipleRecords(keys: string[]) {
		return await AsyncStorage.multiGet(keys);
	}

	/**
	 * Use only for development purposes!!!
	 */
	async clearAppLocalStorage() {
		// DEBUG only
		const keys = await this.getAllKeys();
		await AsyncStorage.multiRemove(keys);
	}
}

export const localStorage = new LocalStorage();
