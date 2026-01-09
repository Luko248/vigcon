import {
  differenceInSeconds,
  isBefore,
  parseISO,
  differenceInMinutes,
} from "date-fns";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdown(targetDate: string): Countdown | null {
  const now = new Date();
  const target = parseISO(targetDate);

  if (isBefore(target, now)) {
    return null; // Conference started, hide countdown
  }

  const diff = differenceInSeconds(target, now);

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}

export function getCurrentTimePosition(
  conferenceDate: string,
  startTime: string,
  endTime: string
): number | null {
  const now = new Date();
  const conferenceStart = parseISO(`${conferenceDate}T${startTime}:00+02:00`);
  const conferenceEnd = parseISO(`${conferenceDate}T${endTime}:00+02:00`);

  if (now < conferenceStart || now > conferenceEnd) {
    return null; // Don't show indicator outside conference hours
  }

  const totalMinutes = differenceInMinutes(conferenceEnd, conferenceStart);
  const elapsedMinutes = differenceInMinutes(now, conferenceStart);
  const percentage = (elapsedMinutes / totalMinutes) * 100;

  return percentage;
}

export function isConferenceDay(conferenceDate: string): boolean {
  const now = new Date();
  const conference = parseISO(conferenceDate);

  return now.toDateString() === conference.toDateString();
}

export function formatTime(time: string): string {
  return time;
}

export function getConferenceDateTime(
  conferenceDate: string,
  time: string
): Date {
  return parseISO(`${conferenceDate}T${time}:00+02:00`);
}
