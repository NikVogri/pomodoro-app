import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useAppStatus = () => {
	const [isActive, setIsActive] = useState<boolean>(true);

	useEffect(() => {
		const handleAppChanged = (state: AppStateStatus) => {
			setIsActive(state === "active");
		};

		const subscription = AppState.addEventListener("change", handleAppChanged);

		return () => {
			subscription.remove();
		};
	}, []);

	return { isActive: isActive };
};
