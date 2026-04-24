export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  timezone: string;
}

export function generateICS(event: CalendarEvent): string {
  const formatDateUtc = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const formatDateLocal = (date: string) => {
    return date.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const timezoneBlock = `BEGIN:VTIMEZONE
TZID:Europe/Prague
X-LIC-LOCATION:Europe/Prague
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE`;

  const escapeText = (text: string) => {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;")
      .replace(/\n/g, "\\n");
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VIGCON//Event//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${timezoneBlock}
BEGIN:VEVENT
UID:${Date.now()}@wigcon.cz
DTSTAMP:${formatDateUtc(new Date())}
DTSTART;TZID=${event.timezone}:${formatDateLocal(event.startDate)}
DTEND;TZID=${event.timezone}:${formatDateLocal(event.endDate)}
SUMMARY:${escapeText(event.title)}
DESCRIPTION:${escapeText(event.description)}
LOCATION:${escapeText(event.location)}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  return ics;
}

export function downloadICS(event: CalendarEvent): void {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "VIGCON2026.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function getConferenceEvent(): CalendarEvent {
  return {
    title: "VIGCON 2026",
    description:
      "Join developers from Vienna Insurance Group showcasing AI innovations and cutting-edge technologies.",
    location: "Okružní 732/5, 638 00 Brno-sever-Lesná, Czech Republic",
    startDate: "2026-05-28T08:30:00",
    endDate: "2026-05-28T15:15:00",
    timezone: "Europe/Prague",
  };
}
