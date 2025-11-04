import { useMemo } from 'react';
import { EltEvent } from '../../../common/types';

const getCustomCalendarEventComponent =
  ({ showIds }: { showIds: boolean }) =>
  ({ event }: { event: EltEvent }) => {
    return (
      <div>
        <h4 style={{ margin: '2px', fontWeight: '500' }}>{event.title}</h4>
        {showIds && <div>id: {event.id}</div>}
      </div>
    );
  };

export const useCalendarView = (showIds: boolean) => {
  const components = useMemo(
    () => ({ event: getCustomCalendarEventComponent({ showIds }) }),
    [showIds],
  );

  return {
    components,
  };
};
