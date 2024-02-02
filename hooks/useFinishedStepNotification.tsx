import { useEffect, useState } from "react";
import { localNotificationsScheduler } from "../services/notification/LocalNotificationsScheduler";
import { getNotificationPayloadByType } from "../util/getNotificationPayloadByType";

export type NotificationType = "timeToFocus" | "timeToTakeABreak";

export const useFinishedStepNotification = (type: NotificationType) => {
	const [scheduledNotification, setScheduledNotification] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			if (!scheduledNotification) return;
			localNotificationsScheduler.cancelScheduledNotification(scheduledNotification);
		};
	}, []);

	const handleScheduleNotification = async (inSeconds: number) => {
		if (scheduledNotification) return; // Prevents scheduling multiple duplicate notifications

		const payload = getNotificationPayloadByType(type);

		const notificationId = await localNotificationsScheduler.scheduleNotification(payload, { seconds: inSeconds });
		if (!notificationId) return;

		setScheduledNotification(notificationId);
	};

	return { scheduleNotification: handleScheduleNotification };
};
