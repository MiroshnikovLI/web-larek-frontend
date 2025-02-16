import { Pattern } from "./Pattern";
import { Product } from "./Product";

export class Basket extends Pattern {
  protected _product: Product[] = [];
  protected _basket: HTMLElement;
  protected _basketList: HTMLElement;
  protected _basketButton: HTMLButtonElement;
  protected _basketPrice: HTMLElement;

  constructor(
    _basket: HTMLElement
  ) {
    super();
    this._basket = _basket;

    this._basketList = this._basket.querySelector('.basket__list');
    this._basketButton = this._basket.querySelector('.basket__button');
    this._basketPrice = this._basket.querySelector('.basket__price');
  }

  // Добавления продукта в карзину
  setProductBasket(product: Product) { 
    if(!this._product.includes(product)) {
        this._product.push(product);
    }
  }

  // Удаление продукта из карзины
  deleteProduct(product: Product) {
    this._product = this._product.filter(x => { return x.id != product.id});
  }

  // Удалить все продукты с карзины
  deleteAllProduct() {
    this._product.length = 0;
  }

  // Получить количество товара в карзине
  getLengthProduct(): number {
    return this._product.length;
  }

  // Получить полный список покупок
  getAllProduct() {
    return this._product;
  }

  // Получить полную сумму карзины
  getPriceAll() {
    let sum = 0;
    const red = this._product.map(g => g.price += sum);
    const numbers = red;
    const sumOfNumbers = numbers.reduce((acc, number) => acc + number, 0);
    return this.getPatterPraci(`${sumOfNumbers}`); 
  }

  // Получить лист карзины
  getBasketList(){
    return this._basketList;
  }

  // Получить кнопку карзины
  getBasketButton() {
    return this._basketButton;
  }

  // Получить елемент цены карзины 
  getPriceBasket() {
    return this._basketPrice;
  }

  // Получить карзину
  getBasket() {
    return this._basket;
  }

  // Очиста листа покупок
  clearBasketList() {
    this._basketList.innerHTML = '';
  }
}
