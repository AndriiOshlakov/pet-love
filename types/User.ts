import { Pet } from './Pet';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  token?: string;
  noticesViewed: Pet[];
  noticesFavorites: Pet[];
  pets: Pet[];
  createdAt?: string;
  updatedAt?: string;
}
