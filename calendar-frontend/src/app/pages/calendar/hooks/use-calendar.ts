import { useEffect, useState } from 'react';
import moment, { unitOfTime, Moment } from 'moment/moment';
import { View } from 'react-big-calendar';
import { EltEvent } from '../../../common/types';
import { CalendarService } from '../../../service/calendar.service';
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';

type PatchArgsWithName = EventInteractionArgs<EltEvent>;
type PatchArgsDatesOnly = EventInteractionArgs<EltEvent>;
type PatchEventArgs = PatchArgsDatesOnly | PatchArgsWithName;

export const useCalendar = () => {
  const calendarService = new CalendarService();
  const [events, setEvents] = useState<EltEvent[]>([]);
  const [showIds, setShowIds] = useState(false);
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

  const patchEventDatesOnly = async (data: PatchArgsDatesOnly): Promise<void> => {
    const { event, start, end } = data;
    const id = Number(event.id);
    const prevState = events;

    setEvents(curr =>
      curr.map(ev =>
        Number(ev.id) === id ? { ...ev, start, end } : ev
      )
    );

    try {
      await calendarService.patchEvent(id, moment(start), moment(end));
    } catch (err) {
      setEvents(prevState);
      // handle error feedback
    }
  };

  const patchEventWithName = async (data: PatchArgsWithName): Promise<void> => {
    const { event, start, end, name } = data;
    const id = Number(event.id);
    const prevState = events;
    setEvents(curr =>
      curr.map(ev =>
        Number(ev.id) === id ? { ...ev, start, end, title: name } : ev
      )
    );

    try {
      await calendarService.patchEvent(id, moment(start), moment(end), name);
    } catch (err) {
      setEvents(prevState);
      // handle error feedback
    }
  };

  const patchEvent = async (data: PatchEventArgs): Promise<void> => {
    if (data.name) {
      return patchEventWithName(data);
    } else {
      return patchEventDatesOnly(data);
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
    showIds,
    setShowIds,
    onNavigate,
    addEvent,
    selectedEvent,
    setSelectedEvent,
    eventModalOpen,
    setEventModalOpen,
  };
};
