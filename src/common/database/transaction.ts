import { Logger } from '@nestjs/common';
import { getConnection, QueryRunner } from 'typeorm';

export async function transaction<T>(
  operationName: string,
  work: (qr: QueryRunner) => Promise<T>,
): Promise<T> {
  const logger = new Logger(operationName);
  const queryRunner = getConnection().createQueryRunner();
  let result = null;
  await queryRunner.connect();
  await queryRunner.startTransaction();
  logger.log('Start transaction');

  try {
    result = await work(queryRunner);
    logger.log('End work and go to commit transaction');
    await queryRunner.commitTransaction();
    logger.log('Successful transaction');
  } catch (err) {
    logger.error(err);
    result = null;
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
  return result;
}
