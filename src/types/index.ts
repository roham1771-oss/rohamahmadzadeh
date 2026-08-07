import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    id: string;
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'ATTORNEY' | 'CLIENT';
  avatar?: string | null;
  phone?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  userId: string;
  user: User;
  nationalId?: string | null;
  fatherName?: string | null;
  birthDate?: string | null;
  occupation?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  emergencyContact?: string | null;
  emergencyPhone?: string | null;
  tags?: string | null;
  notes?: string | null;
  isArchived: boolean;
  cases?: Case[];
  appointments?: Appointment[];
  documents?: Document[];
  invoices?: Invoice[];
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: string;
  title: string;
  caseNumber?: string | null;
  referenceNumber?: string | null;
  description?: string | null;
  practiceArea: string;
  court?: string | null;
  branch?: string | null;
  judgeName?: string | null;
  opposingParty?: string | null;
  clientId: string;
  client?: Client;
  attorneyId: string;
  attorney?: User;
  status: 'OPEN' | 'ACTIVE' | 'PENDING' | 'CLOSED' | 'WON' | 'LOST' | 'SETTLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  openingDate?: string | null;
  closingDate?: string | null;
  nextDeadline?: string | null;
  timeline?: CaseTimeline[];
  tasks?: Task[];
  documents?: Document[];
  notes?: Note[];
  createdAt: string;
  updatedAt: string;
}

export interface CaseTimeline {
  id: string;
  caseId: string;
  title: string;
  description?: string | null;
  eventDate: string;
  eventType: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  reminderDate?: string | null;
  isCompleted: boolean;
  caseId?: string | null;
  case?: Case;
  clientId?: string | null;
  client?: Client;
  assignedToId?: string | null;
  assignedTo?: User;
  createdById: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  title: string;
  description?: string | null;
  appointmentDate: string;
  duration: number;
  type: 'OFFICE' | 'PHONE' | 'VIDEO';
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  clientId: string;
  client?: Client;
  attorneyId: string;
  attorney?: User;
  notes?: string | null;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  mimeType: string;
  category: string;
  description?: string | null;
  caseId?: string | null;
  case?: Case;
  clientId?: string | null;
  client?: Client;
  uploadedById: string;
  uploadedBy?: User;
  isConfidential: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  titleFa: string;
  titleEn: string;
  slug: string;
  contentFa: string;
  contentEn: string;
  excerptFa: string;
  excerptEn: string;
  coverImage?: string | null;
  category: string;
  tags?: string | null;
  authorId: string;
  author?: User;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  viewCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  titleFa: string;
  titleEn: string;
  slug: string;
  descriptionFa: string;
  descriptionEn: string;
  icon?: string | null;
  category: string;
  features?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface FAQ {
  id: string;
  questionFa: string;
  questionEn: string;
  answerFa: string;
  answerEn: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client?: Client;
  caseId?: string | null;
  case?: Case;
  amount: number;
  tax: number;
  total: number;
  description?: string | null;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  issuedAt: string;
  dueAt: string;
  paidAt?: string | null;
  payments?: Payment[];
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoice?: Invoice;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  referenceNumber?: string | null;
  notes?: string | null;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  practiceArea?: string | null;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string | null;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  caseId?: string | null;
  case?: Case;
  clientId?: string | null;
  client?: Client;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationLog {
  id: string;
  clientId: string;
  client?: Client;
  caseId?: string | null;
  case?: Case;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'SMS' | 'NOTE';
  direction: 'INBOUND' | 'OUTBOUND';
  subject?: string | null;
  content?: string | null;
  contactPerson?: string | null;
  loggedAt: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string | null;
  user?: User;
  action: string;
  entity: string;
  entityId: string;
  oldValues?: string | null;
  newValues?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  category: string;
  description?: string | null;
  updatedAt: string;
}

export interface LegalResource {
  id: string;
  titleFa: string;
  titleEn: string;
  slug: string;
  contentFa: string;
  contentEn: string;
  category: string;
  subCategory?: string | null;
  lawReference?: string | null;
  articleNumber?: string | null;
  relatedResources?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CourtDecision {
  id: string;
  titleFa: string;
  titleEn: string;
  slug: string;
  contentFa: string;
  contentEn: string;
  courtType: string;
  caseNumber?: string | null;
  decisionDate: string;
  topics?: string | null;
  keywords?: string | null;
  relatedDecisions?: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  isRead: boolean;
  link?: string | null;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  content: string;
  url: string;
  language: string;
  score: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'appointment' | 'hearing' | 'deadline' | 'meeting';
  color: string;
}
