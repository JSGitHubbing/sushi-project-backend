
import { DataSource } from 'typeorm';
import configuration from '../config/configuration';

export const DATA_SOURCE = 'DATA_SOURCE'
export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource(configuration().database);
            return dataSource.initialize();
        },
    },
];
