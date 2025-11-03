import { Event } from 'react-big-calendar';

export interface EltEvent extends Event {
  title: string;
  id: number;
  start?: Date | string;
  end?: Date | string;
}
