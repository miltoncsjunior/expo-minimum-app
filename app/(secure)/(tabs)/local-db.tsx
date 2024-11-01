import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Animal, columMapping, statements } from '@/schemas/animal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Button, ButtonText, Divider, Text } from '@gluestack-ui/themed';
import { Migrations, Repository } from 'expo-sqlite-orm';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

const databaseName = 'dbName';

export default function LocalDatabaseScreen() {
	const [animals, setAnimals] = useState<Animal[]>([]);
	const migrations = useMemo(() => new Migrations(databaseName, statements), []);

	const animalRepository = useMemo(() => {
		return new Repository(databaseName, 'animals', columMapping);
	}, []);

	const onPressRunMigrations = async () => {
		console.log('migrations', migrations);
		await migrations.migrate();
	};

	const onPressReset = async () => {
		console.log('reset database');
		await migrations.reset();
		setAnimals([]);
	};

	const onPressInsert = () => {
		animalRepository
			.insert({ name: 'Bob', color: 'Brown', age: 2 })
			.then(createdAnimal => {
				console.log(createdAnimal);
			})
			.catch(e => console.log(e));
	};

	const onPressQuery = () => {
		animalRepository
			.query({ where: { age: { gte: 1 } } })
			.then(foundAnimals => {
				console.log(foundAnimals);
				setAnimals(foundAnimals);
			})
			.catch(e => console.log(e));
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<Box style={styles.titleContainer}>
				<Text>Local Database using Expo SQLite ORM</Text>
			</Box>

			<Divider />

			<Button onPress={onPressRunMigrations}>
				<ButtonText>Run Migrations</ButtonText>
			</Button>
			<Button onPress={onPressReset}>
				<ButtonText>Reset database</ButtonText>
			</Button>
			<Button onPress={onPressInsert}>
				<ButtonText>Insert animal</ButtonText>
			</Button>
			<Button onPress={onPressQuery}>
				<ButtonText>List animals</ButtonText>
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
