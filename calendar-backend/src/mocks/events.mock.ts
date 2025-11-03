import { CalendarEventEntity } from '@fs-tech-test/calendar-domain';

export const mockCalendarEventEntity: CalendarEventEntity = {
  id: 1,
  createdAt: new Date('2024-10-07T13:00:00'),
  name: 'Mock event #1',
  start: new Date('2024-10-09T15:00:00'),
  end: new Date('2024-10-09T17:00:00'),
};

export const mockCalendarEventEntity2: CalendarEventEntity = {
  id: 2,
  createdAt: new Date('2024-10-08T17:00:00'),
  name: 'Mock event #2',
  start: new Date('2024-10-08T17:00:00'),
  end: new Date('2024-10-08T18:00:00'),
};