export interface Pet {
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
  user: {
    id: string;
    email: string;
    phone: string;
  };
  popularity: number;
  updatedAt: string;
}
