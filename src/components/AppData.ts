import { FormErrors, IAppState, IContactField, IOrderArray, IOrderField } from "../types/AppData";
import { IProduct } from "../types/Product";
import { Model } from "./base/model";

export class AppState extends Model<IAppState> implements IAppState{

  protected massProduct: IProduct[] = [];

  protected basketItems: IProduct[] = [];

  protected order: IOrderArray = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };

  protected formErrors: FormErrors = {};

  /** Установить данные формы контакты */
  setContactField(field: keyof IContactField, value: string) {
    this.order[field] = value;
    this.validateContacts()
  }

  /** Установить данные формы ордер */
  setOrderField(field: keyof IOrderField, value: string) {
    this.order[field] = value;
    this.validateOrder()
  }

  /** Валидация данных формы контакты */
  validateContacts() {
    const errors = {
      email: '',
      phone: '',
    };
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    super.emitChanges('errors:contact:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  /** Валидация данных формы ордер */
  validateOrder() {
    const errors = {
      payment: '',
      address: '',
    };
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    this.formErrors = errors;
    super.emitChanges('errors:order:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct) {
    if (!this.basketItems.includes(product)) {
      this.basketItems.push(product);
    }
    super.emitChanges('counter:basket');
    super.emitChanges('render:basket:list');
  }

  /** Удалить все продукты с корзины */
  deleteAllProducts() {
    this.basketItems.length = 0;
    super.emitChanges('counter:basket');
  }

  /** Получить количество товара в корзине */
  get productsQuantity(): number {
    return this.basketItems.length === 0 ? 0 : this.basketItems.length
  }

  /** Получить полный список покупок */
  get allProducts(): IProduct[] {
    return this.basketItems;
  }

  /** Получить полную сумму корзины */
  get totalPrice(): number {
    const item = this.basketItems
    return this.basketItems.reduce((acc: any, item: { price: any; }) => acc + (item.price || 0), 0)
  }

  /** Удаление продукта с корзины */
  deleteProduct(product: IProduct) {
    this.basketItems = this.basketItems.filter((x: { id: string; }) => { return x.id != product.id });
    super.emitChanges('counter:basket');
    super.emitChanges('click:basket')
    super.emitChanges('render:basket:list')
  }

  /** Получение полного списка ID товара для отправки на сервер */
  get allIdProducts(): string[] {
    const allIdProducts: string[] = [];
    this.allProducts.forEach(el => (
      allIdProducts.push(el.id)
    ))
    return allIdProducts;
  }

  /** Записать массив продуктов */
  setMassProduct(product: IProduct[]) {
    this.massProduct = product;
    super.emitChanges("product:view");
  }

  /** Получить массив продуктов */
  getMassProduct(): IProduct[] {
    return this.massProduct;
  }

  /** Получить обьект информации о заказе */
  get оrderArray() {
    this.order.total = this.totalPrice;
    this.order.items = this.allIdProducts;
    return this.order
  }

  /** Очистить данные приложения */
  clearAllData() {
    this.deleteAllProducts();
    this.order = {
      items: [],
      payment: '',
      total: null,
      address: '',
      email: '',
      phone: '',
    }
  }
}
