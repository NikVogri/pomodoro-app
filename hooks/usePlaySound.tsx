import { Audio, AVPlaybackSource, AVPlaybackStatusToSet } from "expo-av";
import { useEffect, useState } from "react";

export const usePlaySound = (soundFile: AVPlaybackSource, soundOptions?: AVPlaybackStatusToSet) => {
	const [sound, setSound] = useState<Audio.Sound>();

	useEffect(() => {
		return () => {
			if (sound) sound.unloadAsync();
		};
	}, [sound]);

	async function playSound() {
		if (sound) {
			await sound.replayAsync();
			return;
		}

		const { sound: chime } = await Audio.Sound.createAsync(soundFile, soundOptions);
		setSound(chime);

		await chime.playAsync();
	}

	return { sound, playSound };
};
