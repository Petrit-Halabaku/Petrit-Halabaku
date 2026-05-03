export interface Education {
  degree: string;
  institution: string;
  location?: string;
  periodFrom: string;
  periodTo: string;
  /** Optional highlights, coursework, or honours */
  details?: string[];
}

export function formatEducationPeriod(e: Education): string {
  const from = e.periodFrom.trim();
  const to = e.periodTo.trim();
  if (!from && !to) return "";
  return `${from} – ${to}`;
}

export const EDUCATION: Education[] = [
  {
    degree: "BSc Computer Science",
    institution: "University of Prishtina",
    location: "Prishtina, Kosovo",
    periodFrom: "2014",
    periodTo: "2018",
  },
];
