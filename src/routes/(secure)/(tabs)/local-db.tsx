import ParallaxScrollView from '@/components/ParallaxScrollView';
import { User, UserRepository } from '@/data/entities/user';
import { useLog } from '@/hooks/useLog';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';

// Helper functions for random data generation
const generateRandomName = () => {
	const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Heidi'];
	const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
	const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	return `${randomFirstName} ${randomLastName}`;
};

// Helper functions for random data generation
const generateRandomAge = () => {
	return Math.floor(Math.random() * (60 - 18 + 1)) + 18; // Age between 18 and 60
};

// Helper functions for random data generation
const generateRandomEmail = (name: string) => {
	const sanitizedName = name.toLowerCase().replace(/\s/g, '');
	const domains = ['example.com', 'test.org', 'mail.net'];
	const randomDomain = domains[Math.floor(Math.random() * domains.length)];
	return `${sanitizedName}${Math.floor(Math.random() * 100)}@${randomDomain}`;
};

export default function LocalDatabaseScreen() {
	const [users, setUsers] = useState<User[]>([]);
	const [repository] = useState<UserRepository>(() => new UserRepository());

	const onPressRunMigrations = async () => {
		useLog.info('Running migrations...');
		try {
			await repository.createTable();
			useLog.info('Migrations completed successfully.');
		} catch (err: any) {
			useLog.error('Error running migrations: ' + err.message);
		}
	};

	const onPressReset = async () => {
		useLog.info('Resetting database...');
		try {
			await repository.dropTable();
			await repository.createTable();
			useLog.info('Database reset successfully.');
			setUsers([]);
		} catch (err: any) {
			useLog.error('Error resetting database: ' + err.message);
		}
	};

	const onPressInsert = async () => {
		useLog.info('Inserting user...');
		try {
			const newUser = await repository.create({
				nome: generateRandomName(),
				idade: generateRandomAge(),
				email: generateRandomEmail(generateRandomName()),
			});

			useLog.info('User saved successfully: ' + JSON.stringify(newUser));
			setUsers([...users, newUser]);
		} catch (err: any) {
			useLog.error('Error inserting user: ' + err.message);
		}
	};

	const onPressQuery = async () => {
		useLog.info('Querying users...');
		try {
			const usersDb = await repository.readAll();
			setUsers(usersDb);
			useLog.info('foundUsers: ' + JSON.stringify(usersDb));
		} catch (err: any) {
			useLog.error('Error querying users: ' + err.message);
		}
	};

	useEffect(() => {
		useLog.info('Local database screen started...');
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<View style={styles.titleContainer}>
				<Text>Local Database using Expo SQLite and Generics</Text>
			</View>

			<Divider />

			<Button mode="contained" onPress={onPressRunMigrations}>
				Run migrations
			</Button>
			<Button mode="contained" onPress={onPressInsert}>
				Insert user
			</Button>
			<Button mode="contained" onPress={onPressQuery}>
				List users
			</Button>
			<Button mode="contained" onPress={onPressReset}>
				Reset database
			</Button>

			<Divider />

			{users.length === 0 ? (
				<Text>No users found.</Text>
			) : (
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<Text style={styles.tableHeader}>ID</Text>
						<Text style={styles.tableHeader}>Nome</Text>
						<Text style={styles.tableHeader}>Idade</Text>
						<Text style={styles.tableHeader}>Email</Text>
					</View>
					{users.map(user => (
						<View key={user.id} style={styles.tableRow}>
							<Text style={styles.tableCell}>{user.id}</Text>
							<Text style={styles.tableCell}>{user.nome}</Text>
							<Text style={styles.tableCell}>{user.idade}</Text>
							<Text style={styles.tableCell}>{user.email}</Text>
						</View>
					))}
				</View>
			)}
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
	table: {
		borderWidth: 1,
		borderColor: '#ccc',
		marginVertical: 10,
	},
	tableRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	tableHeader: {
		flex: 1,
		padding: 4,
		fontWeight: 'bold',
		backgroundColor: '#ccc',
		textAlign: 'left',
	},
	tableCell: {
		flex: 1,
		padding: 4,
		textAlign: 'left',
	},
});
