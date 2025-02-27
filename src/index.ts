import './scss/styles.scss';
import { API_URL, settings, } from './utils/constants';
import { Api, } from './components/base/api';
import { IAPIresponse, } from './types';
import { ModalWindows, Success } from './components/Modal';
import { CardBasket, Card, CatologProduct } from './components/Cards';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { BasketData, Basket } from './components/Basket';
import { ProductApi } from './components/Product';
import { cloneTemplate } from './utils/utils';
import { FormContact, FormOrder } from './components/Form';
import { Order } from './components/Order';
import { IProduct } from './types/Product';

/** Подключение к серверу */
const contentApi = new Api(API_URL);

/** Обработчик событий */
const events = new EventEmitter();

/** Продукт */
const product = new ProductApi(events);

/** Элементы страницы */
const pageContainers = new Page(document.querySelector('.page'));

/** Данные корзины */
const cartData = new BasketData({}, events);

/** Класс корзины */
const basketQ = new Basket(cloneTemplate(pageContainers.basketTemplate), events);

/** Модальное окно */
const modal = new ModalWindows(pageContainers.modal, 'modal_active', events)

/** Форма ордер */
const orderForm = new FormOrder(cloneTemplate(pageContainers.orderTemplate), events);

/** Форма контакты */
const contacts = new FormContact(cloneTemplate(pageContainers.contactsTemplate), events);

/** Модальное окно успешного завершания покупок */
const success = new Success(cloneTemplate(pageContainers.successTemplate), modal);

/** Класс order для отправки информации на сервер о заказе */
const order = new Order()

/** Открытие модального окна */
events.on('open:modal', () => {
  modal.setClassOpenModal();
  modal.clearModalContent();
  modal.setFixedModalWindows();
  pageContainers.disablePageScroll();
  events.emit('close:modal:keydown:esc:set');
  events.emit('close:modal:click:set');
})

/** Закрытие модального окна */
events.on('close:modal', () => {
  modal.setClassCloseModal();
  pageContainers.enablePageScroll();
  modal.deleteFixedModalWindows();
  events.emit('close:modal:keydown:esc:remove');
  events.emit('close:modal:click:remove');
})

/** Закрытие модального окна по кнопке ESC */
const closeEsc = function (evt: KeyboardEvent) {
  if (evt.code === 'Escape') {
    modal.setClassCloseModal();
  }
}

events.on('close:modal:keydown:esc:set', () =>
  pageContainers.body.addEventListener('keydown', closeEsc)
);

events.on('close:modal:keydown:esc:remove', () =>
  pageContainers.body.removeEventListener('keydown', closeEsc)
);

/** Закрытие модального окна по клику вне модального окна */
const closeKlick = function (evt: Event) {
  const el = evt.target as HTMLElement;
  if (el.id === 'modal-container') {
    modal.setClassCloseModal();
  }
}

events.on('close:modal:click:set', () =>
  modal.Modal.addEventListener('click', closeKlick)
);

events.on('close:modal:click:remove', () =>
  modal.Modal.removeEventListener('click', closeKlick)
);

// Закрытие модального окна по кнопке крестик
modal.ButtonClose.addEventListener('click', () => modal.setClassCloseModal())

// Кнопка корзины на главном экране
pageContainers.buttonBasket.addEventListener('click', () => {
  modal.openModal();
  events.emit('click:basket');
})

// Счетчик корзины
events.on('counter:basket', () => pageContainers.basketCounter.textContent = `${cartData.ProductsQuantity}`)

// Получение массива продукта
contentApi.get('/product')
  .then((ress: IAPIresponse) => {
    product.setMassProduct(ress.items as IProduct[]);
  })
  .catch((err) => console.log(err));


// Отображение карточек 
events.on('product:view', () => {
  product.getMassProduct().forEach(el => {

    const Catolog = new CatologProduct(cloneTemplate(pageContainers.cardCatalogTemplate), el, events)

    pageContainers.gallery.append(Catolog.render())
  })
})

// Клик на карточку
events.on('click:card:page', (product) => {
  modal.openModal();
  const Cadr = new Card(cloneTemplate(pageContainers.cardPreviewTemplate), Object(product), cartData, events)

  pageContainers.modalContent.append(Cadr.render());
})

// Добавление в корзину
events.on('click:add:basket', (product) => {
  cartData.addProductBasket = (Object(product));
  modal.setClassCloseModal();
})

// Открытие корзины
events.on('click:basket', () => {
  modal.ModalContent.append(basketQ.basket);
  basketQ.setDisabled(basketQ.basketButton, !(cartData.ProductsQuantity > 0))
  basketQ.basketPrice.textContent = basketQ.convertToPriceString(cartData.TotalPrice);

  events.emit('render:basket:list');
})

// Отображение списка корзины
events.on('render:basket:list', () => {
  basketQ.clearBasketList();
  let i: number = 1
  cartData.AllProducts.forEach(element => {
    const product = new CardBasket(cloneTemplate(pageContainers.cardBasketTemplate), element, cartData, i)
    basketQ.getList.append(product.render());
    i++
  });
})

// Отображение формы ордер
events.on('click:form:order', () => {
  modal.clearModalContent();

  modal.ModalContent.append(orderForm.render());

  orderForm.validButtonPayment();
  orderForm.validInput();
})

// Отображение формы контакт
events.on('click:form:content', () => {
  modal.clearModalContent();

  modal.ModalContent.append(contacts.render());
})

// Сохранение данных в ордер
events.on('seve:info:order', () => {
  order.payment = settings.array.payment;
  order.addres = settings.array.address;
  order.email = settings.array.email;
  order.phone = settings.array.phone;
  order.items = cartData.allIdProducts;
  order.total = cartData.TotalPrice;
})

// Отправка двнных на сервер
events.on('send:info:server', () => {

  contentApi.post('/order', order.оrderArray)
    .then(() => {
      modal.clearModalContent();
      success.price = cartData.TotalPrice;
      modal.ModalContent.append(success.getSuccess());
      events.emit('dalete:info');
    })
    .catch((error) => contacts.showErrorMessage = ([`${error}`]) )
})

// Очистка форм и информации
events.on('dalete:info', () => {
  cartData.deleteAllProducts();
  orderForm.deleteInfoFormValid();
  orderForm.clearValidForm();
  contacts.clearValidForm();
  events.emit('counter:basket');
  settings.array = {
    payment: '',
    address: '',
    email: '',
    phone: '',
  }
})
