import { useContext } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './styles/calendar.scss';
import { EltEvent } from '../../../../common/types';
import { CalendarFormats } from './formats';
import { useCalendarView } from '../../hooks/use-calendar-view';
import { CalendarContext } from '../../calendar.context';

moment.locale('en-gb');
moment.updateLocale('en-gb', {
  week: {
    // Set the first day of week to Monday
    dow: 1,
  },
});
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<EltEvent>(Calendar);

interface ICalendarViewProps {
  onNavigate: (date: Date, view: View) => void;
  events: EltEvent[];
  patchEvent: (event: EventInteractionArgs<EltEvent>) => void;
  selectedEvent?: EltEvent;
  setSelectedEvent: (event: EltEvent | undefined) => void;
}

export const CalendarView = ({
  onNavigate,
  events,
  patchEvent,
  selectedEvent,
  setSelectedEvent,
}: ICalendarViewProps) => {
  const { showIds } = useContext(CalendarContext);
  const { components } = useCalendarView(showIds);

  const onEventDrop = (data: EventInteractionArgs<EltEvent>): void =>
    patchEvent(data);
  const onEventResize = (data: EventInteractionArgs<EltEvent>): void =>
    patchEvent(data);

  return (
    <DnDCalendar
      components={components}
      defaultDate={moment().toDate()}
      events={events}
      onNavigate={onNavigate}
      defaultView={'week'}
      onSelectEvent={setSelectedEvent}
      localizer={localizer}
      formats={CalendarFormats}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '80vh' }}
      popup={true}
      dayLayoutAlgorithm={'no-overlap'}
      selectable
      selected={selectedEvent}
      onSelectSlot={() => setSelectedEvent(undefined)}
    />
  );
};
