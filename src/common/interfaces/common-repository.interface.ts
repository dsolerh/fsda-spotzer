import { CommonEntity } from '../models/common.entity';

export interface ICommonRepository<Entity extends CommonEntity, Dto> {
  transactionalCreate(dto: Dto): Promise<Entity>;
}
