export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  timezone: string;
}

export function generateICS(event: CalendarEvent): string {
  const formatDate = (date: string) => {
    return new Date(date)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const escapeText = (text: string) => {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;")
      .replace(/\n/g, "\\n");
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VIG IT Conference//Event//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@wigcon.cz
DTSTAMP:${formatDate(new Date().toISOString())}
DTSTART;TZID=${event.timezone}:${formatDate(event.startDate)}
DTEND;TZID=${event.timezone}:${formatDate(event.endDate)}
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
    startDate: "2026-05-28T09:00:00",
    endDate: "2026-05-28T17:00:00",
    timezone: "Europe/Prague",
  };
}
