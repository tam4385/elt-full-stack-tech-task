import { ApiService } from './api.service';
import { AxiosResponse } from 'axios';
import { Moment } from 'moment';
import { ICalendarEvent } from './types';

interface PatchBody {
  start: string;
  end: string;
  name?: string;
}

export class CalendarService extends ApiService {
  async getEventsForRange(
    start: Moment,
    end: Moment,
  ): Promise<AxiosResponse<ICalendarEvent[]>> {
    return this._axios.get('/api/calendar/date-range', {
      params: { start: start.toISOString(), end: end.toISOString() },
    });
  }

  async createEvent(
    name: string,
    start: Moment,
    end: Moment,
  ): Promise<AxiosResponse<{ message: string; id: number }>> {
    return this._axios.post('/api/calendar/create-event', {
      name,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }

  async patchEvent(
    id: number,
    start: Moment,
    end: Moment,
    title?: string,
  ): Promise<AxiosResponse<{ message: string; id: number }>> {
    const body: PatchBody = {
      start: start.toISOString(),
      end: end.toISOString(),
    };

    if (title) body.name = title;

    return this._axios.patch(`api/calendar/patch-event/${id}`, {
      ...body,
    });
  }
}
