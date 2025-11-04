import { createContext, useState, useMemo } from "react";

interface ICalendarContext {
  showIds: boolean;
  setShowIds: (next: boolean) => void;
}

export const CalendarContext = createContext<ICalendarContext>({
  showIds: false,
  setShowIds: () => {},
});

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showIds, setShowIds] = useState(false);
  const state = useMemo(() => ({ showIds, setShowIds }), [showIds]);
  return <CalendarContext.Provider value={state}>{children}</CalendarContext.Provider>;
};