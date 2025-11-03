import { CalendarService } from './calendar.service';
import { CalendarEventRepository } from '@fs-tech-test/calendar-domain';
import { mockCalendarEventEntity2, mockCalendarEventEntity } from '../mocks/events.mock';
import { BadRequestException } from '@nestjs/common';

describe('CalendarService', () => {
  let service: CalendarService;
  const calendarEventRepository: CalendarEventRepository =
    new CalendarEventRepository(null, null);

  beforeAll(async () => {
    service = new CalendarService(calendarEventRepository);
  });

  describe('getEvents', () => {
    it('should return events from the database', async () => {
      const findForRange = jest
        .spyOn(calendarEventRepository, 'findForRange')
        .mockResolvedValue([mockCalendarEventEntity]);

      const start = '2024-10-08T00:00:00';
      const end = '2024-10-09T00:00:00';
      await expect(service.getEvents(start, end)).resolves.toEqual([
        mockCalendarEventEntity,
      ]);
      expect(findForRange).toHaveBeenCalledWith(new Date(start), new Date(end));
    });
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      jest
        .spyOn(calendarEventRepository, 'findForRange')
        .mockResolvedValue([]);

      const createNewEvent = jest
        .spyOn(calendarEventRepository, 'createNewEvent')
        .mockResolvedValue(mockCalendarEventEntity2);

      const start = '2024-10-10T16:00:00';
      const end = '2024-10-10T18:00:00';
      await service.addEvent({ name: 'Mock event #1', start, end });

      expect(createNewEvent).toHaveBeenCalledWith(
        'Mock event #1',
        new Date(start),
        new Date(end),
      );
    });

    it('should throw an error if start date is after end date', async () => {
      jest
        .spyOn(calendarEventRepository, 'findForRange')
        .mockResolvedValue([]);
      
      jest
        .spyOn(calendarEventRepository, 'createNewEvent')
        .mockRejectedValue(new BadRequestException('Start date must be before end date'));

      const start = '2024-10-09T18:00:00';
      const end = '2024-10-09T16:00:00';
      await expect(
        service.addEvent({ name: 'Mock event #1', start, end })
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const deleteById = jest
        .spyOn(calendarEventRepository, 'deleteById')
        .mockResolvedValue();

      await service.deleteEvent(111);

      expect(deleteById).toHaveBeenCalledWith(111);
    });
  });

  describe('patchEvent', () => {
    it('should patch an event', async () => {
      jest
        .spyOn(calendarEventRepository, 'findForRange')
        .mockResolvedValue([]);

      const patchEvent = jest
        .spyOn(calendarEventRepository, 'patchEvent')
        .mockResolvedValue(mockCalendarEventEntity);

      await service.patchEvent(111, { name: 'Mock event #1', start: '2024-10-11T15:00:00', end: '2024-10-11T17:00:00' });
      expect(patchEvent).toHaveBeenCalledWith(111, { name: 'Mock event #1', start: '2024-10-11T15:00:00', end: '2024-10-11T17:00:00' });
    });

    it('should throw 400 error if conflicting events are found', async () => {
      jest
        .spyOn(calendarEventRepository, 'findForRange')
        .mockResolvedValue([mockCalendarEventEntity]);

      await expect(
        service.patchEvent(111, {
          name: 'Mock event #1',
          start: '2024-10-11T15:00:00',
          end: '2024-10-11T17:00:00',
        })
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
