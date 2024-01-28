import {
	cancelScheduledNotificationAsync,
	cancelAllScheduledNotificationsAsync,
	scheduleNotificationAsync,
	NotificationContentInput,
	NotificationTriggerInput,
} from "expo-notifications";
import { NotificationsPermissionHandler, notificationsPermissionHandler } from "./NotificationsPermissionHandler";

class LocalNotificationsScheduler {
	constructor(private notificationsPermissionHandler: NotificationsPermissionHandler) {}

	async scheduleNotification(
		content: NotificationContentInput,
		trigger: NotificationTriggerInput
	): Promise<string | void> {
		const permissions = await this.notificationsPermissionHandler.getPermissionsStatus();
		if (!permissions.hasPermission) return;

		return await scheduleNotificationAsync({
			content: content,
			trigger: trigger,
		});
	}

	async cancelScheduledNotification(id: string) {
		await cancelScheduledNotificationAsync(id);
	}

	async cancelAllScheduledNotifications() {
		await cancelAllScheduledNotificationsAsync();
	}
}

export const localNotificationsScheduler = new LocalNotificationsScheduler(notificationsPermissionHandler);
