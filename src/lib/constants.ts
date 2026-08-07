export const SITE_NAME = 'دفتر وکالت احمدزاده';
export const SITE_NAME_EN = 'Ahmadzadeh Law Office';
export const SITE_URL = process.env.SITE_URL || 'https://vakilahmadzadeh.ir';
export const SITE_DESCRIPTION = 'دفتر وکالت احمدزاده - رهام احمدزاده وکیل پایه یک دادگستری';
export const SITE_DESCRIPTION_EN = 'Ahmadzadeh Law Office - Attorney at Law';

export const CONTACT_INFO = {
  phone: '۰۹۳۵۷۷۷۰۰۶۶',
  phoneEn: '09357770066',
  mobile: '۰۹۱۲۷۷۷۰۷۸۶',
  mobileEn: '09127770786',
  email: 'vakilahmadzadeh@gmail.com',
  address: 'کرج، میدان معلم، ابتدای خیابان درختی، پلاک ۳۶۵، ساختمان ۱۱۷، واحد ۴',
  addressEn: 'No. 365, Building 117, Unit 4, Start of Darakhti St., Meidan-e Maaref, Karaj',
  workingHours: 'شنبه تا چهارشنبه ۹ الی ۱۷',
  workingHoursEn: 'Saturday - Wednesday, 9 AM - 5 PM',
  instagram: 'https://instagram.com/vakilahmadzadeh',
  whatsapp: 'https://wa.me/vakilahmadzadeh',
  telegram: 'https://t.me/vakilahmadzadeh',
  eitaa: 'https://eitaa.com/vakilahmadzadeh',
  baleh: 'https://ble.ir/vakli\u200Cahmadzadeh',
};

export const PRACTICE_AREAS = [
  { id: 'civil', slug: 'civil', nameFa: 'حقوق مدنی', nameEn: 'Civil Law', icon: 'Scale' },
  { id: 'criminal', slug: 'criminal', nameFa: 'حقوق کیفری', nameEn: 'Criminal Law', icon: 'Shield' },
  { id: 'family', slug: 'family', nameFa: ' حقوق خانواده', nameEn: 'Family Law', icon: 'Users' },
  { id: 'commercial', slug: 'commercial', nameFa: 'حقوق تجارت', nameEn: 'Commercial Law', icon: 'Building' },
  { id: 'property', slug: 'property', nameFa: 'حقوق ملکی', nameEn: 'Property Law', icon: 'Home' },
  { id: 'labor', slug: 'labor', nameFa: 'حقوق کار', nameEn: 'Labor Law', icon: 'Briefcase' },
  { id: 'administrative', slug: 'administrative', nameFa: 'حقوق اداری', nameEn: 'Administrative Law', icon: 'Landmark' },
  { id: 'international', slug: 'international', nameFa: 'حقوق بین‌الملل', nameEn: 'International Law', icon: 'Globe' },
] as const;

export const CASE_STATUSES = [
  { value: 'OPEN', labelFa: 'باز', labelEn: 'Open', color: 'blue' },
  { value: 'ACTIVE', labelFa: 'فعال', labelEn: 'Active', color: 'green' },
  { value: 'PENDING', labelFa: 'در انتظار', labelEn: 'Pending', color: 'yellow' },
  { value: 'CLOSED', labelFa: 'بسته شده', labelEn: 'Closed', color: 'gray' },
  { value: 'WON', labelFa: 'برنده', labelEn: 'Won', color: 'emerald' },
  { value: 'LOST', labelFa: 'باخته', labelEn: 'Lost', color: 'red' },
  { value: 'SETTLED', labelFa: 'سازش', labelEn: 'Settled', color: 'purple' },
] as const;

export const CASE_PRIORITIES = [
  { value: 'LOW', labelFa: 'کم', labelEn: 'Low', color: 'gray' },
  { value: 'MEDIUM', labelFa: 'متوسط', labelEn: 'Medium', color: 'blue' },
  { value: 'HIGH', labelFa: 'بالا', labelEn: 'High', color: 'orange' },
  { value: 'URGENT', labelFa: 'فوری', labelEn: 'Urgent', color: 'red' },
] as const;

export const APPOINTMENT_TYPES = [
  { value: 'OFFICE', labelFa: 'حضوری', labelEn: 'In-Person' },
  { value: 'PHONE', labelFa: 'تلفنی', labelEn: 'Phone' },
  { value: 'VIDEO', labelFa: 'ویدیویی', labelEn: 'Video' },
] as const;

export const DOCUMENT_CATEGORIES = [
  { value: 'contract', labelFa: 'قرارداد', labelEn: 'Contract' },
  { value: 'petition', labelFa: 'دادخواست', labelEn: 'Petition' },
  { value: 'complaint', labelFa: 'شکایت‌نامه', labelEn: 'Complaint' },
  { value: 'defense', labelFa: 'لایحه دفاعیه', labelEn: 'Defense Brief' },
  { value: 'correspondence', labelFa: 'مکاتبات', labelEn: 'Correspondence' },
  { value: 'evidence', labelFa: 'مستندات', labelEn: 'Evidence' },
  { value: 'court-order', labelFa: 'دادنامه', labelEn: 'Court Order' },
  { value: 'other', labelFa: 'سایر', labelEn: 'Other' },
] as const;

export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760');
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const ITEMS_PER_PAGE = 12;
export const ADMIN_ITEMS_PER_PAGE = 20;
