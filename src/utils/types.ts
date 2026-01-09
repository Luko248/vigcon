export type Locale = "en" | "cz";

export interface Talk {
  id: string;
  startTime: string;
  endTime: string;
  track: string;
  title: {
    en: string;
    cz: string;
  };
  speakerId?: string;
  language?: string;
  hashtags?: string[];
  annotation?: {
    en: string;
    cz: string;
  };
  type?: "break" | "special";
}

export interface Speaker {
  id: string;
  name: string;
  initials: string;
  photo: string;
  company: string;
  status: "confirmed" | "open";
  topic: {
    en: string;
    cz: string;
  };
  abstract: {
    en: string;
    cz: string;
  };
  role?: {
    en: string;
    cz: string;
  };
  country?: string;
  bio?: {
    en: string;
    cz: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Track {
  id: string;
  name: {
    en: string;
    cz: string;
  };
}

export interface ConferenceData {
  conference: {
    date: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  tracks: Track[];
  schedule: Talk[];
}

export interface SpeakersData {
  speakers: Speaker[];
}

export interface FAQItem {
  id: string;
  type: "venue" | "transport" | "food" | "language";
  question: {
    en: string;
    cz: string;
  };
  answer: {
    en: string;
    cz: string;
  };
}

export interface ContentData {
  about: {
    en: {
      title: string;
      description: string;
      highlights: string[];
    };
    cz: {
      title: string;
      description: string;
      highlights: string[];
    };
  };
  faq: {
    items: FAQItem[];
  };
  transportDetails: {
    publicTransport: {
      en: TransportOption;
      cz: TransportOption;
    };
    rideshare: {
      en: TransportOption;
      cz: TransportOption;
    };
  };
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    mapEmbed: string;
  };
}

export interface TransportOption {
  title: string;
  steps?: string[];
  options?: string[];
  duration: string;
  cost: string;
}
