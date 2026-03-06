
export interface BrandConfig {
  logoName: string;
  primaryColor: string;
  accentColor: string;
  lightBlue: string;
  grayBlue: string;
  headerFont: string;
  bodyFont: string;
  contactEmail: string;
  legalName: string;
}

export enum TransactionStep {
  STARTED = 1,
  FINANCING = 2,
  IDENTITY = 3,
  DOCUMENTS = 4,
  SEARCH = 5,
  CLEARING = 6,
  SCHEDULE = 7,
  SUMMARY = 8,
  CLOSED = 9
}

export type ViewMode = 'buyer' | 'agent';
export type ExperienceLevel = 'simple' | 'standard' | 'complete';

export interface AgentInfo {
  name: string;
  brokerage: string;
  phone: string;
  email: string;
  image: string;
}

export interface Document {
  id: string;
  name: string;
  status: 'In Review' | 'Action Needed' | 'Complete';
}

export interface TitleIssue {
  id: string;
  description: string;
  party: string;
  status: 'Pending' | 'Resolved';
}
