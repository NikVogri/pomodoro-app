import { AppState, AppStateStatus } from "react-native";
import { useEffect } from "react";

export const useAppStateChange = ({
	onAppActive,
	onAppBackground,
}: {
	onAppActive: () => void;
	onAppBackground: () => void;
}) => {
	const handleAppStateChange = (state: AppStateStatus) => {
		if (state === "active") onAppActive();
		if (state === "background") onAppBackground();
	};

	useEffect(() => {
		const appStateListener = AppState.addEventListener("change", handleAppStateChange);
		return () => appStateListener.remove();
	}, []);
};
