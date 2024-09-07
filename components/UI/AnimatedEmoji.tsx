import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface AnimatedEmojiProps {
	source: ImageSourcePropType;
}

function AnimatedEmoji({ source }: AnimatedEmojiProps) {
	return <Image source={source} style={styles.animatedEmoji} />;
}

const styles = StyleSheet.create({
	animatedEmoji: {
		height: 84,
		resizeMode: "contain",
		marginBottom: 15,
		alignSelf: "center",
	},
});

export default AnimatedEmoji;
