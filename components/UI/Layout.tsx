import { StyleSheet, View } from "react-native";

interface LayoutProps {
	children: JSX.Element;
	backgroundColor?: string;
}

function Layout({ children, backgroundColor }: LayoutProps) {
	return <View style={[styles.layout, { backgroundColor }]}>{children}</View>;
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
