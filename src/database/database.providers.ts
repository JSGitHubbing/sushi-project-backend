
import configuration from 'config/configuration';
import { DataSource } from 'typeorm';

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
