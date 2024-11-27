import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLog } from '@/hooks/useLog';
import { Animal, columMapping, statements } from '@/schemas/animal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Migrations, Repository } from 'expo-sqlite-orm';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';

const databaseName = 'dbName';

function stringGenerator(length: number): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	let counter = 0;
	let result = '';

	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}

	return result;
}

export default function LocalDatabaseScreen() {
	const [animals, setAnimals] = useState<Animal[]>([]);
	const migrations = useMemo(() => new Migrations(databaseName, statements), []);

	const animalRepository = useMemo(() => {
		return new Repository(databaseName, 'animals', columMapping);
	}, []);

	const onPressRunMigrations = async () => {
		useLog.info('migrations: ' + JSON.stringify(migrations));
		await migrations.migrate();
	};

	const onPressReset = async () => {
		useLog.info('reset database');
		await migrations.reset();
		setAnimals([]);
	};

	const onPressInsert = () => {
		animalRepository
			.insert({
				name: stringGenerator(5),
				color: stringGenerator(10),
				age: Math.floor(Math.random() * (1 - 30) + 1) * -1,
			})
			.then(createdAnimal => {
				useLog.info('createdAnimal: ' + JSON.stringify(createdAnimal));
			})
			.catch(e => useLog.error(e));
	};

	const onPressQuery = () => {
		animalRepository
			.query({ where: { age: { gte: 1 } } })
			.then(foundAnimals => {
				useLog.info('foundAnimals: ' + JSON.stringify(foundAnimals));
				setAnimals(foundAnimals);
			})
			.catch(e => useLog.error(e));
	};

	useEffect(() => {
		useLog.info('Local database screen started...');
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<View style={styles.titleContainer}>
				<Text>Local Database using Expo SQLite ORM</Text>
			</View>

			<Divider />

			<Button mode="contained" onPress={onPressRunMigrations}>
				Run Migrations
			</Button>
			<Button mode="contained" onPress={onPressReset}>
				Reset database
			</Button>
			<Button mode="contained" onPress={onPressInsert}>
				Insert animal
			</Button>
			<Button mode="contained" onPress={onPressQuery}>
				List animals
			</Button>
			<Text>{JSON.stringify(animals, null, 1)}</Text>
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
