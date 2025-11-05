import { BadRequestException, Injectable } from '@nestjs/common';
import { CalendarEventRepository } from '@fs-tech-test/calendar-domain';
import { EventDto } from './calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarEventRepository: CalendarEventRepository,
  ) {}

  async getEvents(start: string, end: string) {
    if (!start || !end) throw new BadRequestException('No start/end specified');

    return this.calendarEventRepository.findForRange(
      new Date(start),
      new Date(end),
    );
  }

  async addEvent(payload: EventDto) {
    const conflictingEvents = await this.checkForConflictingEvents(
      payload.start,
      payload.end,
    );

    if (conflictingEvents.length > 0) {
      throw new BadRequestException('Conflicting events found');
    }

    const newEntity = await this.calendarEventRepository.createNewEvent(
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return newEntity.id;
  }

  // used for DND date patch and edit event
  async patchEvent(id: number, payload: EventDto) {
    const conflictingEvents = await this.checkForConflictingEvents(
      payload.start,
      payload.end,
    );

    // if event name -> its editing the same event, so will always have conflict
    const filteredConflictingEvents = conflictingEvents.filter(
      (event) => event.id !== id,
    );

    if (filteredConflictingEvents.length > 0) {
      throw new BadRequestException('Conflicting events found');
    }

    return await this.calendarEventRepository.patchEvent(id, payload);
  }

  async deleteEvent(id: number) {
    await this.calendarEventRepository.deleteById(id);
  }

  async checkForConflictingEvents(start: string, end: string) {
    const conflictingEvents = await this.calendarEventRepository.findForRange(
      new Date(start),
      new Date(end),
    );

    return conflictingEvents;
  }
}
