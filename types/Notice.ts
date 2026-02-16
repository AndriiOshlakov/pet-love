import { Pet } from './Pet';

export interface Notice {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
}

export interface Notices {
  page: number;
  perPage: number;
  totalPages: number;
  results: Pet[];
}

export interface NoticeRequestParams {
  keyword?: string;
  category?: 'sell' | 'free' | 'lost' | 'found' | '';
  species?:
    | 'dog'
    | 'cat'
    | 'monkey'
    | 'bird'
    | 'snake'
    | 'turtle'
    | 'lizard'
    | 'frog'
    | 'fish'
    | 'ants'
    | 'bees'
    | 'butterfly'
    | 'spider'
    | 'scorpion'
    | '';
  locationId?: string;
  byDate?: boolean;
  byPrice?: boolean | null;
  byPopularity?: boolean | null;
  page: number;
  limit?: number;
  sex?: 'unknown' | 'female' | 'male' | 'multiple' | '';
}
