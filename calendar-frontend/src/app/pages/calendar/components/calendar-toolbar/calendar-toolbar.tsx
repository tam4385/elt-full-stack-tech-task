import { EltEvent } from '../../../../common/types';
import { Dispatch, SetStateAction } from 'react';
import { ToolbarStyle } from './styles/calendar-toolbar-style';

interface ICalendarToolbarProps {
  showIds: boolean;
  setShowIds: Dispatch<boolean>;
  selectedEvent?: EltEvent;
  setEventModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedEvent: Dispatch<SetStateAction<EltEvent | undefined>>;
}

export const CalendarToolbar = ({
  showIds,
  setShowIds,
  selectedEvent,
  setEventModalOpen,
  setSelectedEvent,
}: ICalendarToolbarProps) => {
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
