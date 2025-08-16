import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLog } from '@/hooks/useLog';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

export default function LogViewerScreen() {
	const [files, setFiles] = useState<string[]>([]);
	const [file, setFile] = useState<string | null>(null);
	const [logs, setLogs] = useState<string | null>(null);

	const rootDirectory = FileSystem.documentDirectory;

	const fileViewRef = useRef(null);

	useEffect(() => {
		rootDirectory &&
			FileSystem.readDirectoryAsync(rootDirectory)
				.then(result => {
					if (result) {
						setFiles(
							result.filter((item: string) => {
								if (item.startsWith('log_') && item.endsWith('.txt')) {
									return item;
								}
							}),
						);
					}
				})
				.catch(err => {
					useLog.error(err);
				});
	}, [rootDirectory]);

	useEffect(() => {
		if (file) {
			FileSystem.readAsStringAsync(rootDirectory + file, { encoding: FileSystem.EncodingType.UTF8 })
				.then(result => {
					setLogs(result);
				})
				.catch(err => {
					useLog.error(err);
				});
		}
	}, [file, rootDirectory]);

	useEffect(() => {
		useLog.info('Log viewer screen started...');
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<View style={styles.titleContainer}>
				<Text>Local files logs</Text>
			</View>

			<Divider />

			<View>
				<ScrollView
					ref={fileViewRef}
					// onContentSizeChange={() =>
					// 	fileViewRef.current && fileViewRef.current.scrollToEnd({ animated: true })
					// }>
				>
					{files.map((item: string, index: number) => {
						return (
							<TouchableOpacity
								key={index}
								onPress={() => {
									setFile(item);
								}}>
								<Text>- {item}</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>

				<Divider style={{ marginTop: 20, marginBottom: 20 }} />

				<ScrollView
					ref={fileViewRef}
					// onContentSizeChange={() =>
					// 	fileViewRef.current && fileViewRef.current.scrollToEnd({ animated: true })
					// }
				>
					{logs ? <Text>{logs}</Text> : <Text>SELECT LOG FILE...</Text>}
				</ScrollView>
			</View>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
