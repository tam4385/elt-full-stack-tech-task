import { EltEvent } from '../../../../common/types';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ToolbarStyle } from './styles/calendar-toolbar-style';
import { CalendarContext } from '../../calendar.context';

interface ICalendarToolbarProps {
  selectedEvent?: EltEvent;
  setEventModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedEvent: Dispatch<SetStateAction<EltEvent | undefined>>;
}

export const CalendarToolbar = ({
  selectedEvent,
  setEventModalOpen,
  setSelectedEvent,
}: ICalendarToolbarProps) => {
  const { showIds, setShowIds } = useContext(CalendarContext);
  const editEvent = (event?: EltEvent) => {
    setEventModalOpen(true);
    setSelectedEvent(event);
  };

  return (
    <div css={ToolbarStyle}>
      {/* <button data-testid="add-event-btn" onClick={createRandomEvent}> */}
      <button
        data-testid="add-event-btn"
        onClick={() => setEventModalOpen(true)}
        disabled={!!selectedEvent}
      >
        Add event
      </button>
      <button
        data-testid="edit-event-btn"
        onClick={() => editEvent(selectedEvent)}
        disabled={!selectedEvent}
      >
        Edit event
      </button>
      <label htmlFor="show-ids-checkbox">
        <input
          id="show-ids-checkbox"
          type="checkbox"
          defaultChecked={showIds}
          onClick={(e) => setShowIds(e.currentTarget.checked)}
        ></input>
        Show ids
      </label>
    </div>
  );
};
