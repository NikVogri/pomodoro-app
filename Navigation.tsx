import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./screens/models";
import { isDevEnv } from "./util/isDevEnv";

import MainScreen from "./screens/MainScreen";
import FocusHistory from "./screens/FocusHistory";
import FocusSettings from "./screens/FocusSettings";
import Focus from "./screens/Focus";
import Break from "./screens/Break";
import Completed from "./screens/Completed";
import CancelledSession from "./screens/CancelledSession";
import Debug from "./screens/Debug";
import About from "./screens/About";

const customTheme = DefaultTheme;
DefaultTheme.colors.background = "#EB5757";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
	return (
		<NavigationContainer theme={customTheme}>
			<Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }} initialRouteName="Main">
				<Stack.Screen name="Main" component={MainScreen} />
				<Stack.Screen name="FocusSettings" component={FocusSettings} />
				<Stack.Screen name="FocusHistory" component={FocusHistory} />
				<Stack.Screen name="Focus" component={Focus} />
				<Stack.Screen name="Break" component={Break} />
				<Stack.Screen name="Completed" component={Completed} />
				<Stack.Screen name="CancelledSession" component={CancelledSession} />
				<Stack.Screen name="About" component={About} />
				{isDevEnv && <Stack.Screen name="Debug" component={Debug} />}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
