import { BaseEntity } from '@/data/generics/base-entity';
import { BaseRepository, ColumnDefinition } from '@/data/generics/base-repository';

export interface User extends BaseEntity {
	nome: string;
	idade: number;
	email: string;
}

const databaseTable = 'users';

const databaseColumns: ColumnDefinition[] = [
	{ name: 'nome', type: 'TEXT', constraints: 'NOT NULL' },
	{ name: 'idade', type: 'INTEGER', constraints: 'NOT NULL' },
	{ name: 'email', type: 'TEXT', constraints: 'NOT NULL UNIQUE' },
];

export class UserRepository extends BaseRepository<User> {
	constructor() {
		super(databaseTable, databaseColumns);
	}
}
