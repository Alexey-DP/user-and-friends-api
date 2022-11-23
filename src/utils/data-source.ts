require('dotenv').config()
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import config from 'config';
import { SeederOptions } from 'typeorm-extension';
import { UserFactory } from '../seeds/factories/user.factory';
import MainSeeder from '../seeds/main.seed';

const postgresConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>('postgresConfig');

const options: DataSourceOptions & SeederOptions = {
    ...postgresConfig,
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    seeds: [MainSeeder],
    factories: [UserFactory],
}

export const AppDataSource = new DataSource(options);