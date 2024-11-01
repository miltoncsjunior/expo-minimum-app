import { ColumnMapping, columnTypes, IStatement, sql } from 'expo-sqlite-orm';

export interface Animal {
	id: number;
	name: string;
	color: string;
	age: number;
	another_uid?: number;
	timestamp?: number;
}

export const columMapping: ColumnMapping<Animal> = {
	id: { type: columnTypes.INTEGER },
	name: { type: columnTypes.TEXT },
	color: { type: columnTypes.TEXT },
	age: { type: columnTypes.NUMERIC },
	another_uid: { type: columnTypes.INTEGER },
	timestamp: { type: columnTypes.INTEGER, default: () => Date.now() },
};

export const statements: IStatement = {
	'1662689376195_create_animals': sql`
        CREATE TABLE animals (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          color TEXT,
          age NUMERIC,
          another_uid TEXT UNIQUE,
          timestamp INTEGER
        );`,
};
