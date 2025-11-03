import { IsDateString, IsOptional, IsString, Validate } from 'class-validator';
import { IsStartBeforeEnd } from './calendar.validators';

/**
 * DTO for creating and updating events
 * @example
 * {
 *   start: '2025-01-01T00:00:00.000Z',
 *   end: '2025-01-01T01:00:00.000Z',
 *   name: 'Event name'
 * }
 */
export class EventDto {
  @IsDateString({ strict: true }, { message: 'start must be a valid ISO 8601 date-string' })
  start: string;

  @IsDateString({ strict: true }, { message: 'end must be a valid ISO 8601 date-string' })
  @IsStartBeforeEnd({ message: 'end date must be after start date' })
  end: string;

  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name?: string;
}
