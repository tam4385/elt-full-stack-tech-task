import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { AddEventDialog } from './components/calendar-event-modal/calendar-event-modal';
import { useCalendar } from './hooks/use-calendar';

export const CalendarPage = () => {
  const {
    events,
    addEvent,
    patchEvent,
    onNavigate,
    showIds,
    selectedEvent,
    setShowIds,
    setSelectedEvent,
    eventModalOpen,
    setEventModalOpen,
  } = useCalendar();

  return (
    <div>
      <CalendarToolbar
        showIds={showIds}
        setShowIds={setShowIds}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setEventModalOpen={setEventModalOpen}
      />
      <CalendarView
        onNavigate={onNavigate}
        events={events}
        patchEvent={patchEvent}
        showIds={showIds}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <AddEventDialog
        open={eventModalOpen}
        event={selectedEvent}
        onSave={addEvent}
        patchEvent={patchEvent}
        onOpenChange={setEventModalOpen}
      />
    </div>
  );
};
