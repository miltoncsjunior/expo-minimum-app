import * as SQLite from 'expo-sqlite';
import { DataSource } from 'typeorm';
import { User } from './entities/user';

export const appDataSource = new DataSource({
	type: 'expo',
	database: 'expo-minimum-db.sqlite',
	driver: SQLite,
	synchronize: false,
	logging: false,
	//entities: ['data/entities/*.ts'],
	entities: [User],
	migrations: ['data/migrations/*.ts'],
	subscribers: [],
});
