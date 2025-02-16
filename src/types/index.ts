export interface IAPIresponse {
  items: ICard[];
}

export interface IApiProductData {
  items: Promise<IProductData>;
  readonly baseUrl: string;
}

export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  addBasket: true | false;
}

export interface IProductData  {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

