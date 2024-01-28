import { isDevEnv } from "./util/isDevEnv";

export const DEFAULT_FOCUS_LENGTH_IN_MINUTES = 25;
export const DEFAULT_BREAK_LENGTH_IN_MINUTES = 5;
export const DEFAULT_REPEAT_COUNT = 2;

export const MAX_FOCUS_LENGHT_IN_MINUTES = 60;
export const MAX_BREAK_LENGHT_IN_MINUTES = 25;
export const MAX_REPEAT_COUNT = 10;

export const INTERVAL_PERIOD_IN_SECONDS = isDevEnv ? 100 : 1000;
export const MIN_FOCUS_LENGHT_IN_MINUTES = isDevEnv ? 1 : 10;
export const MIN_BREAK_LENGHT_IN_MINUTES = isDevEnv ? 1 : 3;
export const MIN_REPEAT_COUNT = 0;

export const ALLOWED_IDLE_TIME_IN_SECONDS = 120;
