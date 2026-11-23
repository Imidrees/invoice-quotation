export const COMPANIES = {
  AMANI: {
    id: 'company-amani',
    type: 'amani',
    name: 'AMANI MUHAMMAD AL OTAIBI GENERAL CONTRACTING COMPANY',
    nameArabic: 'شركة أماني محمد العتيبي للمقاولات العامة',
    crNumber: 'TBD', // To be extracted from invoice 1.pdf
    vatNumber: 'TBD', // To be extracted from invoice 1.pdf
    address: 'TBD',
    addressArabic: 'TBD',
    email: 'TBD',
    phone: 'TBD',
    website: 'TBD',
    bankName: 'TBD',
    bankNameArabic: 'TBD',
    accountName: 'TBD',
    accountNameArabic: 'TBD',
    accountNumber: 'TBD',
    ibanNumber: 'TBD',
    swiftCode: 'TBD',
  },
  DIOUF: {
    id: 'company-diouf',
    type: 'diouf',
    name: 'DIOUF ALSHARQ GENERAL CONTRACTING COMPANY',
    nameArabic: 'شركة ضيوف الشرق للمقاولات العامة',
    crNumber: '4030313386',
    vatNumber: '310205801200003',
    address: 'Gharnath Street, opposite Saudi Aramco Complex, Musharifa, Jeddah, Saudi Arabia',
    addressArabic: 'TBD', // To be extracted from invoice 2.pdf
    email: 'info@dioufalsharq.com',
    phone: 'TBD', // To be extracted from invoice 2.pdf
    website: 'TBD',
    bankName: 'TBD',
    bankNameArabic: 'TBD',
    accountName: 'TBD',
    accountNameArabic: 'TBD',
    accountNumber: 'TBD',
    ibanNumber: 'TBD',
    swiftCode: 'TBD',
  },
};

export const DEFAULT_VAT_RATE = 15; // percent
export const CURRENCY = 'SAR';
export const TIMEZONE = 'Asia/Riyadh';

export const MAX_LINE_ITEMS = 10;
export const MIN_LINE_ITEMS = 1;

export const DOCUMENT_STATUSES = {
  DRAFT: 'draft',
  SAVED: 'saved',
  ARCHIVED: 'archived',
} as const;
