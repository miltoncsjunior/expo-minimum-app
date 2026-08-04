import ParallaxScrollView from '@/components/ParallaxScrollView';
import { appDataSource } from '@/data/datasource';
import { User } from '@/data/entities/user';
import { Users } from '@/data/models/user';
import { useLog } from '@/hooks/useLog';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { Repository } from 'typeorm/browser';

export default function LocalDatabaseScreen() {
	const [users, setUsers] = useState<Users[]>([]);
	const [repository, setRepository] = useState<Repository<User> | null>(null);

	const connect = async () => {
		if (!appDataSource.isInitialized) {
			useLog.info('Initializing database...');
			try {
				await appDataSource.initialize();
				useLog.info('Database initialized successfully.');
			} catch (err: any) {
				useLog.error('Failed to initialize database: ' + err.message);
				return;
			}
		} else {
			useLog.info('Database already initialized.');
		}

		const repo = appDataSource.getRepository(User);
		setRepository(repo);
	};

	const onPressRunMigrations = async () => {
		useLog.info('Running migrations...');
		try {
			await connect();
			await appDataSource.synchronize();
			useLog.info('Migrations completed successfully.');
		} catch (err: any) {
			useLog.error('Error running migrations: ' + err.message);
		}
	};

	const onPressReset = async () => {
		useLog.info('Resetting database...');
		try {
			await connect();
			await appDataSource.synchronize();
			const repo = repository ?? appDataSource.getRepository(User);
			setRepository(repo);
			await repo.clear();
			useLog.info('Database reset successfully.');
			setUsers([]);
		} catch (err: any) {
			useLog.error('Error resetting database: ' + err.message);
		}
	};

	const onPressInsert = async () => {
		if (!repository) {
			useLog.error('Repository not ready. Initializing DB...');
			await connect();
		}

		const repo = repository ?? appDataSource.getRepository(User);
		setRepository(repo);
		if (!repo) return;

		useLog.info('Inserting user...');
		const user = new User();
		user.firstName = 'Timber';
		user.lastName = 'Saw';
		user.age = 25;

		try {
			await repo.save(user);
			useLog.info('User saved successfully: ' + JSON.stringify(user));
		} catch (err: any) {
			useLog.error('Error inserting user: ' + err.message);
		}
	};

	const onPressQuery = async () => {
		if (!repository) {
			useLog.error('Repository not ready. Initializing DB...');
			await connect();
		}

		const repo = repository ?? appDataSource.getRepository(User);
		setRepository(repo);
		if (!repo) return;

		useLog.info('Querying users...');
		try {
			const usersDb = await repo.find();
			setUsers(usersDb);
			useLog.info('foundUsers: ' + JSON.stringify(usersDb));
		} catch (err: any) {
			useLog.error('Error querying users: ' + err.message);
		}
	};

	useEffect(() => {
		useLog.info('Local database screen started...');
		connect();
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
			<View style={styles.titleContainer}>
				<Text>Local Database using Expo SQLite and TypeORM</Text>
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

			<Text>{JSON.stringify(users, null, 1)}</Text>
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
