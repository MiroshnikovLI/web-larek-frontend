export interface IProduct {
  /** ID продукта */
  id: string;

  /** Описание продукта */
  description: string;

  /** Изображение продукта */
  image: string;

  /** Название продукта */
  title: string;

  /** Котегория продукта */
  category: string;

  /** Цена продукта */
  price: number | null;
}