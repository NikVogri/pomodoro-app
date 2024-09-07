import { StyleSheet, View } from "react-native";
import NavigationBackButton from "./NavigationBackButton";

interface LayoutProps {
	children: React.ReactNode;
	backgroundColor?: string;
	showBackButton?: boolean;
}

function Layout({ children, backgroundColor, showBackButton }: LayoutProps) {
	return (
		<View style={[styles.layout, { backgroundColor }]}>
			{showBackButton && <NavigationBackButton />}
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		justifyContent: "center",
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
});

export default Layout;
