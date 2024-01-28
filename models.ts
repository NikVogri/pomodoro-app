export interface FocusConfig {
	focusTimeInSecs: number;
	breakTimeInSecs: number;
	repeat: number;
}

export interface FocusHistoryRecord {
	id: string;
	config: FocusConfig;
	startTimestamp: number;
	endTimestamp: null | number;
	completed: boolean;
	cancelled: boolean;
}

export interface FocusConfigWithId extends FocusConfig {
	id: string;
}
