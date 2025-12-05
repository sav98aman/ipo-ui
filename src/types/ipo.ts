export type IPOStatus = 'Upcoming' | 'Current' | 'Closed';

export interface GMPHistoryItem {
  date: string;
  gmp: number;
  gmpPercent: number;
}

export interface IPOData {
  id: string;
  companyName: string;
  logo: string;
  openDate: string;
  closeDate: string;
  priceRange: string;
  lotSize: number;
  issueSize: string;
  listingDate: string;
  gmp: number;
  gmpPercent: number;
  gmpLastUpdated: string;
  subscribed: string;
  retail: string;
  qib: string;
  nii: string;
  aiSummary: string;
  status: IPOStatus;
  sector: string;
  leadManager: string;
  nseUrl: string;
  bseUrl: string;
  prospectusUrl: string;
  gmpHistory: GMPHistoryItem[];
  // Allow for dynamic fields
  [key: string]: any;
}
