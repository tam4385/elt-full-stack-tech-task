import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { EventModal } from './components/calendar-event-modal/calendar-event-modal';
import { useCalendar } from './hooks/use-calendar';
import { CalendarProvider } from './calendar.context';

export const CalendarPage = () => {
  const {
    events,
    addEvent,
    patchEvent,
    onNavigate,
    selectedEvent,
    setSelectedEvent,
    eventModalOpen,
    setEventModalOpen,
  } = useCalendar();

  return (
    <CalendarProvider>
      <CalendarToolbar
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setEventModalOpen={setEventModalOpen}
      />
      <CalendarView
        onNavigate={onNavigate}
        events={events}
        patchEvent={patchEvent}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <EventModal
        open={eventModalOpen}
        event={selectedEvent}
        onSave={addEvent}
        patchEvent={patchEvent}
        onOpenChange={setEventModalOpen}
      />
    </CalendarProvider>
  );
};
