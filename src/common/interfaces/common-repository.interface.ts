import { FindManyOptions } from 'typeorm';
import { CommonEntity } from '../models/common.entity';

export interface ICommonRepository<Entity extends CommonEntity, Dto> {
  transactionalCreate(dto: Dto): Promise<Entity>;
  find(options?: FindManyOptions): Promise<Entity[]>;
  findOne(id: number | string | Date): Promise<Entity>;
}
