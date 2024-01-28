import { getPermissionsAsync, IosAuthorizationStatus, requestPermissionsAsync } from "expo-notifications";
import { Platform } from "react-native";

export class NotificationsPermissionHandler {
	async getPermissionsStatus(): Promise<{ canAskAgain: boolean; hasPermission: boolean }> {
		const permissions = await getPermissionsAsync();

		let hasPermission: boolean;
		if (Platform.OS === "ios") {
			hasPermission = permissions.ios?.status === IosAuthorizationStatus.AUTHORIZED;
		} else {
			hasPermission = permissions.granted;
		}

		return {
			canAskAgain: permissions.canAskAgain,
			hasPermission: hasPermission,
		};
	}

	async requestPermissions(): Promise<void> {
		await requestPermissionsAsync({
			android: {},
			ios: {
				allowAlert: true,
				allowSound: true,
			},
		});
	}
}

export const notificationsPermissionHandler = new NotificationsPermissionHandler();
