import { FocusConfig, FocusHistoryRecord } from "../../models";
import { generateUuid } from "../../util/generateUuid";
import { LocalStorage, localStorage } from "./LocalStorage";

class FocusHistory {
	constructor(private localStorage: LocalStorage) {}

	async createRecord(focusConfig: FocusConfig): Promise<FocusHistoryRecord> {
		const id = generateUuid();

		const record: FocusHistoryRecord = {
			id: id,
			config: { ...focusConfig },
			completed: false,
			cancelled: false,
			startTimestamp: Date.now(),
			endTimestamp: null,
		};

		await this.localStorage.storeData(JSON.stringify(record), id);
		return record;
	}

	async getRecord(key: string): Promise<FocusHistoryRecord | void> {
		return await this.localStorage.getRecord<FocusHistoryRecord>(key);
	}

	async getAllRecords(): Promise<FocusHistoryRecord[]> {
		const keys = await this.localStorage.getAllKeys();
		const records = await this.localStorage.getMultipleRecords(keys);

		const output: FocusHistoryRecord[] = [];

		for (const [, recordValue] of records) {
			if (recordValue) {
				output.push(JSON.parse(recordValue));
			}
		}

		return output;
	}

	async markCompleted(key: string): Promise<void> {
		const record = await this.getRecord(key);
		if (!record) return;

		record.completed = true;
		record.endTimestamp = Date.now();

		await this.localStorage.storeData(JSON.stringify(record), record.id);
	}

	async markCancelled(key: string): Promise<void> {
		const record = await this.getRecord(key);
		if (!record) return;

		record.cancelled = true;
		record.endTimestamp = Date.now();

		await this.localStorage.storeData(JSON.stringify(record), record.id);
	}
}

export const focusHistory = new FocusHistory(localStorage);
