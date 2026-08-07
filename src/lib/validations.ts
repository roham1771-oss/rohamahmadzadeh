import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'نام باید حداقل ۳ کاراکتر باشد').max(100),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره تلفن نامعتبر است').optional().or(z.literal('')),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تایید آن مطابقت ندارند',
  path: ['confirmPassword'],
});

export const contactSchema = z.object({
  name: z.string().min(2, 'نام الزامی است').max(100),
  email: z.string().email('ایمیل نامعتبر است'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره تلفن نامعتبر است').optional().or(z.literal('')),
  subject: z.string().min(3, 'موضوع الزامی است').max(200),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد').max(5000),
  practiceArea: z.string().optional(),
});

export const articleSchema = z.object({
  titleFa: z.string().min(3).max(200),
  titleEn: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  contentFa: z.string().min(50),
  contentEn: z.string().min(50),
  excerptFa: z.string().min(10).max(500),
  excerptEn: z.string().min(10).max(500),
  coverImage: z.string().url().optional().or(z.literal('')),
  category: z.string().min(1),
  tags: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export const serviceSchema = z.object({
  titleFa: z.string().min(2).max(100),
  titleEn: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  descriptionFa: z.string().min(10).max(2000),
  descriptionEn: z.string().min(10).max(2000),
  icon: z.string().optional(),
  category: z.string().min(1),
  features: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0),
});

export const clientSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().regex(/^09\d{9}$/).optional().or(z.literal('')),
  nationalId: z.string().regex(/^\d{10}$/).optional().or(z.literal('')),
  fatherName: z.string().max(100).optional().or(z.literal('')),
  birthDate: z.string().optional().or(z.literal('')),
  occupation: z.string().max(100).optional().or(z.literal('')),
  address: z.string().max(500).optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  province: z.string().max(100).optional().or(z.literal('')),
  postalCode: z.string().regex(/^\d{10}$/).optional().or(z.literal('')),
  emergencyContact: z.string().max(100).optional().or(z.literal('')),
  emergencyPhone: z.string().optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  tags: z.string().optional(),
});

export const caseSchema = z.object({
  title: z.string().min(3).max(200),
  caseNumber: z.string().max(50).optional().or(z.literal('')),
  referenceNumber: z.string().max(50).optional().or(z.literal('')),
  description: z.string().max(5000).optional().or(z.literal('')),
  practiceArea: z.string().min(1),
  court: z.string().max(100).optional().or(z.literal('')),
  branch: z.string().max(100).optional().or(z.literal('')),
  judgeName: z.string().max(100).optional().or(z.literal('')),
  opposingParty: z.string().max(200).optional().or(z.literal('')),
  clientId: z.string().min(1),
  status: z.enum(['OPEN', 'ACTIVE', 'PENDING', 'CLOSED', 'WON', 'LOST', 'SETTLED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  openingDate: z.string().optional().or(z.literal('')),
  closingDate: z.string().optional().or(z.literal('')),
  nextDeadline: z.string().optional().or(z.literal('')),
});

export const appointmentSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional().or(z.literal('')),
  appointmentDate: z.string().min(1, 'تاریخ قرار الزامی است'),
  duration: z.number().int().min(15).max(480).default(60),
  type: z.enum(['OFFICE', 'PHONE', 'VIDEO']),
  clientId: z.string().min(1),
  notes: z.string().max(2000).optional().or(z.literal('')),
});

export const taskSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional().or(z.literal('')),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.string().min(1),
  reminderDate: z.string().optional().or(z.literal('')),
  caseId: z.string().optional().or(z.literal('')),
  clientId: z.string().optional().or(z.literal('')),
});

export const invoiceSchema = z.object({
  clientId: z.string().min(1),
  caseId: z.string().optional().or(z.literal('')),
  amount: z.number().positive(),
  tax: z.number().min(0).default(0),
  description: z.string().max(2000).optional().or(z.literal('')),
  dueDate: z.string().min(1),
});

export const faqSchema = z.object({
  questionFa: z.string().min(5).max(500),
  questionEn: z.string().min(5).max(500),
  answerFa: z.string().min(10).max(5000),
  answerEn: z.string().min(10).max(5000),
  category: z.string().min(1),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const newsletterSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  name: z.string().max(100).optional().or(z.literal('')),
});

export const documentSchema = z.object({
  title: z.string().min(2).max(200),
  category: z.string().min(1),
  description: z.string().max(2000).optional().or(z.literal('')),
  caseId: z.string().optional().or(z.literal('')),
  clientId: z.string().optional().or(z.literal('')),
  isConfidential: z.boolean().default(false),
});
