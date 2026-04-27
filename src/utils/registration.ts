import scheduleData from "@data/schedule.json";

/**
 * Returns true when registration-related UI (form, nav link, CTAs,
 * "Add to Calendar" button) should be rendered at build time.
 *
 * Two conditions must both be satisfied:
 * 1. The `registrationOpen` flag in `schedule.json` is `true` (manual override).
 * 2. The current build date is strictly before the conference day.
 *    On the day of the conference (and after), registration is hidden forever.
 */
export const isRegistrationVisible = (): boolean => {
  const flag = (scheduleData as { registrationOpen?: boolean }).registrationOpen;
  if (flag !== true) return false;

  const conferenceDate = new Date(`${scheduleData.conference.date}T00:00:00`);
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return todayStart.getTime() < conferenceDate.getTime();
};

/** Conference date (YYYY-MM-DD) — used by client-side hide script. */
export const getConferenceDate = (): string => scheduleData.conference.date;
