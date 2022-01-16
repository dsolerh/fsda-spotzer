import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  private logger = new Logger('Config');
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value) {
      if (throwOnMissing) {
        throw new Error(`config error - missing env.${key}`);
      } else {
        this.logger.log(`config error - missing env.${key}`);
      }
    }
    return value;
  }

  /**
   * ensureValues
   */
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  /**
   * getPort
   */
  public getPort(): string {
    return this.getValue('PORT');
  }

  /**
   * isProduction
   */
  public isProduction(): boolean {
    return this.getValue('MODE', false) != 'DEV';
  }

  /**
   * getTypeORMConfig
   */
  public getTypeORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),

      entities: ['**/*.entity.js'],

      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction(),
      synchronize: !this.isProduction(),
      dropSchema: !this.isProduction(),
      logging: !this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
]);

export { configService };
