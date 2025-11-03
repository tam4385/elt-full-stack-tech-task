import { CalendarEventEntity } from '../entity/calendar-event.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

interface PatchDates {
  start: string;
  end: string;
  name?: string;
}

@Injectable()
export class CalendarEventRepository extends EntityRepository<CalendarEventEntity> {
  async findForRange(start: Date, end: Date): Promise<CalendarEventEntity[]> {
    // By default, mikro-orm uses Knex query syntax but you can use raw queries like this if it's easier:
    // const rawResult = await this.em.getKnex().raw<CalendarEventEntity[][]>('select * from elt_event where start <= ? AND end >= ?', [end, start])
    // return rawResult[0];
    return this.find({ start: { $lt: end }, end: { $gt: start } });
  }

  async createNewEvent(
    name: string,
    start: Date,
    end: Date,
  ): Promise<CalendarEventEntity> {
    const newEntity = this.create({ name, start, end });
    await this.insert(newEntity);

    return newEntity;
  }

  async deleteById(id: number): Promise<void> {
    await this.nativeDelete({ id });
  }

  async patchEvent(id: number, payload: PatchDates) {
    if (!payload.start || !payload.end)
      throw new BadRequestException('Start or end date not supplied');

    const entity = await this.findOne({ id });

    if (!entity) throw new NotFoundException('Event not found');

    entity.start = new Date(payload.start);
    entity.end = new Date(payload.end);
    if (payload.name) entity.name = payload.name;

    await this.em.flush();
    return entity;
  }
}
