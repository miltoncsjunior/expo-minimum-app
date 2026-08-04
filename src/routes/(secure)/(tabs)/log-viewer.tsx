import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLog } from '@/hooks/useLog';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Directory, File, Paths } from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const logDirectory = new Directory(Paths.document, 'logs');

export default function LogViewerScreen() {
	const [files, setFiles] = useState<string[]>([]);
	const [file, setFile] = useState<string | null>(null);
	const [logs, setLogs] = useState<string>('');
	const fileViewRef = useRef(null);

	useEffect(() => {
		try {
			if (!logDirectory.exists) {
				logDirectory.create();
			}

			const contents = logDirectory.list();

			const logFiles = contents
				.filter(item => item instanceof File && item.name.startsWith('log_') && item.name.endsWith('.txt'))
				.map(fileItem => fileItem.name);

			setFiles(logFiles);
		} catch (err) {
			console.error('Erro ao ler/inicializar diretório:', err);
		}
	}, []);

	useEffect(() => {
		if (!file) return;

		const targetFile = new File(logDirectory, file);

		targetFile
			.text()
			.then(result => {
				setLogs(result);
			})
			.catch(err => {
				useLog.error(err);
			});
	}, [file]);

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
