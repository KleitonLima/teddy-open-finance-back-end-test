import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

function isObject(entity: unknown): entity is object {
  return typeof entity === 'object' && entity !== null;
}

@EventSubscriber()
export class TypeOrmSubscriber implements EntitySubscriberInterface {
  private async transformAndValidateEntity(entity: unknown): Promise<void> {
    if (isObject(entity)) {
      const ctor = entity.constructor as ClassConstructor<object>;
      const transformedEntity = plainToInstance(ctor, entity);
      await validateOrReject(transformedEntity);
    }
  }

  async beforeInsert(event: InsertEvent<object>): Promise<void> {
    if (event.entity) {
      await this.transformAndValidateEntity(event.entity);
    }
  }

  async beforeUpdate(event: UpdateEvent<object>): Promise<void> {
    if (event.entity) {
      await this.transformAndValidateEntity(event.entity);
    }
  }
}
