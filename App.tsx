import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as splashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { setNotificationHandler } from "expo-notifications";
import { notificationsPermissionHandler } from "./services/notification/NotificationsPermissionHandler";
import { localNotificationsScheduler } from "./services/notification/LocalNotificationsScheduler";

import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./screens/SplashScreen";

// TODO: Add own notification handler here.
setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

splashScreen.preventAutoHideAsync();
export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		const bootstrap = async () => {
			const { hasPermission, canAskAgain } = await notificationsPermissionHandler.getPermissionsStatus();

			if (!hasPermission && canAskAgain) {
				await notificationsPermissionHandler.requestPermissions();
			}

			setAppIsReady(true);
		};

		bootstrap();

		return () => {
			localNotificationsScheduler.cancelAllScheduledNotifications();
		};
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) await splashScreen.hideAsync();
	}, [appIsReady]);

	if (!appIsReady) {
		return <SplashScreen />;
	}

	return (
		<View style={{ flex: 1, backgroundColor: "#EB5757" }} onLayout={onLayoutRootView}>
			<SafeAreaProvider>
				<StatusBar style="light" translucent />
				<Navigation />
			</SafeAreaProvider>
		</View>
	);
}
