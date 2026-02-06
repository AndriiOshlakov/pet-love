export interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: WorkDay[];
  phone: string;
  email: string;
}

interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}
