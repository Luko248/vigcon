import scheduleData from "@data/schedule.json";

type RegistrationScheduleData = {
  conference: {
    date: string;
    startTime: string;
  };
  schedule: Array<{
    startTime: string;
  }>;
  registrationOpen?: boolean;
};

const registrationData = scheduleData as RegistrationScheduleData;

const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const getFirstScheduleStartTime = (): string => {
  if (!registrationData.schedule.length) {
    return registrationData.conference.startTime;
  }

  const firstItem = registrationData.schedule.reduce((earliest, current) =>
    parseTimeToMinutes(current.startTime) <
    parseTimeToMinutes(earliest.startTime)
      ? current
      : earliest,
  );

  return firstItem.startTime;
};

const getConferenceStartLocalDate = (): Date => {
  const startTime = getFirstScheduleStartTime();
  return new Date(`${registrationData.conference.date}T${startTime}:00`);
};

/**
 * Central source of truth.
 * Registration is available only when manual flag is enabled and current time
 * is strictly before conference start datetime.
 */
export const isRegistrationVisibleAt = (date: Date): boolean => {
  const isManuallyOpen = registrationData.registrationOpen !== false;
  if (!isManuallyOpen) {
    return false;
  }

  const conferenceStart = getConferenceStartLocalDate();
  return date.getTime() < conferenceStart.getTime();
};

/** Build-time/server-side check. */
export const isRegistrationVisible = (): boolean =>
  isRegistrationVisibleAt(new Date());

/** ISO-like datetime string (local) used for runtime checks in the browser. */
export const getConferenceStartDateTimeLocal = (): string => {
  const startTime = getFirstScheduleStartTime();
  return `${registrationData.conference.date}T${startTime}:00`;
};
