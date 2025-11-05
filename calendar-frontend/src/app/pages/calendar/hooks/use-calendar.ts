import { useEffect, useState } from 'react';
import moment, { unitOfTime, Moment } from 'moment/moment';
import { View } from 'react-big-calendar';
import { EltEvent } from '../../../common/types';
import { CalendarService } from '../../../service/calendar.service';
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';

export const useCalendar = () => {
  const calendarService = new CalendarService();
  const [events, setEvents] = useState<EltEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EltEvent | undefined>();
  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const today = moment();
    fetchEvents(today.startOf('week'), today.clone().endOf('week'));
  }, []);

  const fetchEvents = async (start: Moment, end: Moment) => {
    const { data } = await calendarService.getEventsForRange(start, end);
    const processedEvents: EltEvent[] = data.map((e) => ({
      id: e.id,
      title: e.name,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(processedEvents);
  };

  const onNavigate = async (newDate: Date, view: View) => {
    const newMutableDate = moment(newDate);
    const unitOfTime = viewToUnitOfTime(view);
    await fetchEvents(
      newMutableDate.clone().startOf(unitOfTime),
      newMutableDate.clone().endOf(unitOfTime),
    );
  };

  const addEvent = async (event: Omit<EltEvent, 'id'>) => {
    const {
      data: { id },
    } = await calendarService.createEvent(
      event.title,
      moment(event.start),
      moment(event.end),
    );
    setEvents((events) => [...events, { ...event, id }]);
  };

  const patchEventDatesOnly = async (
    data: EventInteractionArgs<EltEvent>,
  ): Promise<void> => {
    const { start, end } = data;
    const { id } = data.event as EltEvent;
    const prevState = events;

    setEvents((curr) =>
      curr.map((ev) => (Number(ev.id) === id ? { ...ev, start, end } : ev)),
    );

    try {
      await calendarService.patchEvent(id, moment(start), moment(end));
    } catch (err) {
      setEvents(prevState);
      // handle error feedback
    }
  };

  const patchEventWithName = async (data: EltEvent): Promise<void> => {
    const { id, start, end, title } = data;
    const prevState = events;
    setEvents((curr) =>
      curr.map((ev) =>
        Number(ev.id) === id ? { ...ev, start, end, title } : ev,
      ),
    );

    try {
      await calendarService.patchEvent(id, moment(start), moment(end), title);
    } catch (err) {
      setEvents(prevState);
      // handle error feedback
    }
  };

  const patchEvent = async (
    data: EltEvent | EventInteractionArgs<EltEvent>,
  ): Promise<void> => {
    if ('title' in data && 'id' in data) {
      return patchEventWithName(data as EltEvent);
    } else {
      return patchEventDatesOnly(data as EventInteractionArgs<EltEvent>);
    }
  };

  const viewToUnitOfTime = (view: View): unitOfTime.StartOf => {
    switch (view) {
      case 'day':
      case 'week':
      case 'month':
        return view;
      case 'agenda':
        return 'month';
      default:
        return 'week';
    }
  };

  return {
    events,
    patchEvent,
    onNavigate,
    addEvent,
    selectedEvent,
    setSelectedEvent,
    eventModalOpen,
    setEventModalOpen,
  };
};
