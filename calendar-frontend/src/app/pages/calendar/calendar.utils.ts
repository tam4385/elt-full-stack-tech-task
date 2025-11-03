import { DateLocalizer } from 'react-big-calendar';

export const localize24HrTime = (
  date: Date,
  localizer?: DateLocalizer,
): string | undefined => {
  return localizer?.format(date, 'HH:mm');
};

export const toLocalInput = (d: Date) => {
  const pad = (n: number) => `${n}`.padStart(2, '0');
  const yyyy = d.getFullYear(),
    mm = pad(d.getMonth() + 1),
    dd = pad(d.getDate());
  const hh = pad(d.getHours()),
    mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};
