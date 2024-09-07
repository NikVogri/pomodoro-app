import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";
import Button from "../components/UI/Button";

import Layout from "../components/UI/Layout";

function About({ navigation }: ScreenProps<"About">) {
	const startSessionHandler = () => {
		navigation.navigate("FocusSettings");
	};

	return (
		<Layout backgroundColor="#219653" showBackButton>
			<ScrollView style={styles.container}>
				<Image source={require("../assets/pomodoro.png")} style={styles.logo} />
				<Text style={styles.title}>Pomodoro technique</Text>
				<Text style={styles.paragraph}>
					The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.
					It uses a kitchen timer to break work into intervals, typically 25 minutes in length, separated by
					short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the
					tomato-shaped kitchen timer Cirillo used as a university student.
				</Text>
				<Text style={styles.subtitle}>Technique</Text>
				<View style={styles.paragraph}>
					<Text style={styles.paragraph}>The original technique has six steps:</Text>
					<Text style={styles.listItem}>1. Decide on the task to be done.</Text>
					<Text style={styles.listItem}>2. Set the pomodoro timer (typically for 25 minutes).</Text>
					<Text style={styles.listItem}>3. Work on the task.</Text>
					<Text style={styles.listItem}>
						4. End work when the timer rings and take a short break (typically 5-10 minutes).
					</Text>
					<Text style={styles.listItem}>
						5. If you have finished fewer than three pomodoros, go back to Step 2 and repeat until you go
						through all three pomodoros. After three pomodoros are done, take the fourth pomodoro and then
						take a long break (typically 20 to 30 minutes).
					</Text>
					<Text style={styles.listItem}>
						6. Once the long break is finished, return to step 2. For the purposes of the technique, a
						pomodoro is an interval of work time.
					</Text>
				</View>
				<Text style={styles.paragraph}>
					For the purposes of the technique, a pomodoro is an interval of work time
				</Text>
				<Text style={styles.paragraph}>
					Regular breaks are taken, aiding assimilation. A 10-minute break separates consecutive pomodoros.
					Four pomodoros form a set. There is a longer 20-30 minute break between sets.
				</Text>
				<Text style={styles.paragraph}>
					A goal of the technique is to reduce the effect of internal and external interruptions on focus and
					flow. A pomodoro is indivisible; when interrupted during a pomodoro, either the other activity must
					be recorded and postponed (using the inform - negotiate - schedule - call back strategy) or the
					pomodoro must be abandoned.
				</Text>
				<View style={styles.paragraph}>
					<Text style={styles.paragraph}>
						After task completion in a pomodoro, any remaining time should be devoted to activities, for
						example:
					</Text>
					<View>
						<Text style={styles.listItem}>1. Review your work just completed.</Text>
						<Text style={styles.listItem}>
							2. Review the activities from a learning point of view (ex: What learning objective did you
							accomplish? What learning outcome did you accomplish? Did you fulfill your learning target,
							objective, or outcome for the task?){" "}
						</Text>
						<Text style={styles.listItem}>
							3. Review the list of upcoming tasks for the next planned pomodoro time blocks, and start
							reflecting on or updating them.
						</Text>
					</View>
				</View>
				<Text style={styles.paragraph}>
					Cirillo suggests: Specific cases should be handled with common sense: If you finish a task while the
					Pomodoro is still ticking, the following rule applies: If a Pomodoro begins, it has to ring.
					It&apos;s a good idea to take advantage of the opportunity for overlearning, using the remaining
					portion of the Pomodoro to review or repeat what you&apos;ve done, make small improvements, and note
					what you&apos;ve learned until the Pomodoro rings.
				</Text>
				<Text style={styles.paragraph}>
					The stages of planning, tracking, recording, processing and visualizing are fundamental to the
					technique. In the planning phase, tasks are prioritized by recording them in a &quot;To Do
					Today&quot; list, enabling users to estimate the effort they will require. As pomodoros are
					completed, they are recorded, adding to a sense of accomplishment and providing raw data for
					subsequent self-observation and improvement.
				</Text>
				<Button onPress={startSessionHandler} type="flat">
					Start a session now!
				</Button>
				<Text
					style={[styles.paragraph, { fontStyle: "italic", fontSize: 14 }]}
					onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Pomodoro_Technique")}
				>
					Source: https://en.wikipedia.org/wiki/Pomodoro_Technique
				</Text>
				<Text style={styles.subtitle}>Credits</Text>
				<Text style={[styles.paragraph, { fontStyle: "italic", fontSize: 14 }]}>
					Icons by Animated Emoji, sourced from https://googlefonts.github.io/noto-emoji-animation/, licensed
					under CC BY 4.0.
				</Text>
			</ScrollView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	logo: {
		height: 84,
		resizeMode: "contain",
		width: "auto",
	},
	title: {
		marginTop: 10,
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "white",
		textAlign: "center",
	},
	subtitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 10,
		color: "white",
	},
	paragraph: {
		fontSize: 15,
		marginBottom: 15,
		color: "white",
		fontWeight: "400",
		lineHeight: 25,
	},
	listItem: {
		fontSize: 15,
		marginBottom: 5,
		color: "white",
		fontWeight: "400",
	},
});

export default About;
