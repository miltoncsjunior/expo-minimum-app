import { BaseEntity } from '@/data/generics/base-entity';
import * as SQLite from 'expo-sqlite';

export type ColumnDefinition = {
	name: string;
	type: 'INTEGER' | 'TEXT' | 'REAL' | 'BLOB';
	constraints?: string;
};

export class BaseRepository<T extends BaseEntity> {
	private tableName: string;
	private columns: ColumnDefinition[];

	constructor(tableName: string, columns: ColumnDefinition[]) {
		this.tableName = tableName;
		this.columns = columns;
	}

	static async openDatabase() {
		return await SQLite.openDatabaseAsync('expo-minimum.db');
	}

	async createTable(): Promise<void> {
		const database = await BaseRepository.openDatabase();
		const columnDefinitions = this.columns
			.map(col => `${col.name} ${col.type} ${col.constraints || ''}`.trim())
			.join(', ');

		const query = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnDefinitions});`;
		await database.execAsync(query);
	}

	async dropTable(): Promise<void> {
		const database = await BaseRepository.openDatabase();
		const query = `DROP TABLE IF EXISTS ${this.tableName};`;
		await database.execAsync(query);
	}

	async create(item: Omit<T, 'id'>): Promise<T> {
		const database = await BaseRepository.openDatabase();

		const columns = Object.keys(item).join(', ');
		const placeholders = Object.keys(item)
			.map(() => '?')
			.join(', ');
		const values = Object.values(item);

		const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders});`;

		const resultado = await database.runAsync(query, values as SQLite.SQLiteBindValue[]);
		const newItem = await this.readById(resultado.lastInsertRowId);
		if (!newItem) {
			throw new Error('Failed to retrieve the newly created item.');
		}
		return newItem;
	}

	async readAll(): Promise<T[]> {
		const database = await BaseRepository.openDatabase();
		const query = `SELECT * FROM ${this.tableName};`;
		return await database.getAllAsync<T>(query);
	}

	async readById(id: number): Promise<T | null> {
		const database = await BaseRepository.openDatabase();
		const query = `SELECT * FROM ${this.tableName} WHERE id = ?;`;
		return await database.getFirstAsync<T>(query, [id]);
	}

	async updateById(id: number, item: Omit<T, 'id'>): Promise<void> {
		const database = await BaseRepository.openDatabase();

		const camposSet = Object.keys(item)
			.map(key => `${key} = ?`)
			.join(', ');
		const values = Object.values(item);

		const query = `UPDATE ${this.tableName} SET ${camposSet} WHERE id = ?;`;

		await database.runAsync(query, [...values, id] as SQLite.SQLiteBindValue[]);
	}

	async deleteById(id: number): Promise<void> {
		const database = await BaseRepository.openDatabase();
		const query = `DELETE FROM ${this.tableName} WHERE id = ?;`;
		await database.runAsync(query, [id]);
	}
}
