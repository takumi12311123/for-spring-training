import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'postgres',
  host: '172.23.0.3',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'twitter',
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
});

export default source;
