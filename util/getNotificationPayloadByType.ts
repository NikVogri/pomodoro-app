import { NotificationType } from "../hooks/useFinishedStepNotification";

export const getNotificationPayloadByType = (type: NotificationType): { title: string; body: string } => {
	switch (type) {
		case "timeToFocus":
			return {
				title: "Time to focus!",
				body: "You've been taking a break for a while. It's time to focus!",
			};
		case "timeToTakeABreak":
			return {
				title: "Time to take a break!",
				body: "You've been focusing for a while. Take a break!",
			};
		default:
			throw new Error("Invalid notification type");
	}
};
