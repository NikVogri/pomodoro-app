const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

// TODO: Can't use crypto package in React Native so this will suffice for now. Improve in the future.
export const generateUuid = () => S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
