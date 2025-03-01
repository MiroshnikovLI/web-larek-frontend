import './scss/styles.scss';
import { API_URL, } from './utils/constants';
import { Api, } from './components/base/api';
import { IAPIresponse, } from './types';
import { ModalWindows, Success } from './components/Modal';
import { CardBasket, Card, CatologProduct } from './components/Cards';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { BasketData, Basket } from './components/Basket';
import { ProductCardManager } from './components/Product';
import { cloneTemplate, } from './utils/utils';
import { Order } from './components/Order';
import { IProduct } from './types/Product';
import { FormContact, FormOrder, ValidForm } from './components/Form';

/** Подключение к серверу */
const contentApi = new Api(API_URL);

/** Обработчик событий */
const events = new EventEmitter();

/** Продукт */
const product = new ProductCardManager(events);

/** Элементы страницы */
const pageContainers = new Page(document.querySelector('.page'));

/** Данные корзины */
const basketData = new BasketData({}, events);

/** Класс корзины */
const basket = new Basket(cloneTemplate(pageContainers.basketTemplate), events, pageContainers.buttonBasket, {
  onClick: () => {
    modal.openModal();
    events.emit('click:basket');
    events.emit('render:basket:list');
  }
});

/** Модальное окно */
const modal = new ModalWindows(pageContainers.modal, 'modal_active', events)

/** Форма ордер */
const orderForm = new FormOrder(cloneTemplate(pageContainers.orderTemplate), 'button_alt-active', {
  onClick: () => {
    events.emit('click:form:content');
    validSetting.clearFormValid();
  }
});

/** Форма контакты */
const contacts = new FormContact(cloneTemplate(pageContainers.contactsTemplate), {
  onClick: () => {
    events.emit('seve:info:order');
    events.emit('send:info:server');
    validSetting.clearFormValid();
  }
});

/** Класс валидации форм */
const validSetting = new ValidForm(events)

/** Модальное окно успешного завершания покупок */
const success = new Success(cloneTemplate(pageContainers.successTemplate), {
  onClick: () => modal.closeModal()
});

/** Класс order для отправки информации на сервер о заказе */
const order = new Order();

/** Открытие модального окна */
events.on('open:modal', () => {
  modal.clearModalContent();
  modal.setFixedModalWindows();
  pageContainers.disablePageScroll();
  pageContainers.body.addEventListener('keydown', closeEsc)
})

/** Закрытие модального окна */
events.on('close:modal', () => {
  pageContainers.enablePageScroll();
  modal.deleteFixedModalWindows();
  pageContainers.body.removeEventListener('keydown', closeEsc)
})

/** Закрытие модального окна по кнопке ESC */
const closeEsc = function (evt: KeyboardEvent) {
  if (evt.code === 'Escape') {
    modal.closeModal();
  }
}

// Счетчик корзины
events.on('counter:basket', () => {
  pageContainers.counterBasket(basketData.productsQuantity)
})

// Получение массива продукта
contentApi.get('/product')
  .then((ress: IAPIresponse) => {
    product.setMassProduct(ress.items as IProduct[]);
  })
  .catch((err) => console.log(err));

// Отображение карточек 
events.on('product:view', () => {
  const cotolog: HTMLElement[] = []
  product.getMassProduct().map(el => {
    const catolog = new CatologProduct(cloneTemplate(pageContainers.cardCatalogTemplate), {
      onClick: () => events.emit('click:card:page', el)
    })
    cotolog.push(catolog.render())
    return [
      catolog.cotegoryClass = el.category,
      catolog.cotegoryValie = el.category,
      catolog.titleValue = el.title,
      catolog.imgValue = el.image,
      catolog.priceValue = el.price,
    ]
  })
  pageContainers.gallery.replaceChildren(...cotolog)
})

// Клик на карточку
events.on('click:card:page', (product: IProduct) => {
  modal.openModal();

  const cardPreview = new Card(cloneTemplate(pageContainers.cardPreviewTemplate), basketData.allProducts.includes(product) || product.price === null, {
    onClick: () => events.emit('click:add:basket', product)
  })

  cardPreview.imgValue = product.image;
  cardPreview.cotegoryClass = product.category;
  cardPreview.cotegoryValie = product.category;
  cardPreview.titleValue = product.title;
  cardPreview.priceValue = product.price;

  pageContainers.modalContent.replaceChildren(cardPreview.render());
})

// Добавление в корзину
events.on('click:add:basket', (product) => {
  basketData.addProductBasket = (Object(product));
  modal.closeModal();
})

// Удаление с корзины
events.on('delet:prod:basket', (product: IProduct) => {
  basketData.deleteProduct(product);
})

// Открытие корзины
events.on('click:basket', () => {
  modal.modalContent.replaceChildren(basket.basket);
  basket.basketPrice.textContent = basket.convertToPriceString(basketData.totalPrice);
})

// Отображение списка корзины  
events.on('render:basket:list', () => {
  let i: number = 1;
  basket.items = basketData.allProducts.map(element => {
    const cardBasket = new CardBasket(cloneTemplate(pageContainers.cardBasketTemplate), {
      onClick: () => events.emit('delet:prod:basket', element)
    });

    cardBasket.titleValue = element.title;
    cardBasket.priceValue = element.price;
    cardBasket.basketIntex = i++;

    return cardBasket.render()
  });
})

// Отображение формы ордер
events.on('click:form:order', () => {
  modal.clearModalContent();
  validSetting.validInputsOrder(orderForm.inputsForms);
  validSetting.validButtonPayment(orderForm.paymentsButton, 'button_alt-active')
  modal.modalContent.replaceChildren(orderForm.render());
})

// Отображение формы контакт
events.on('click:form:content', () => {
  modal.clearModalContent();
  validSetting.validInputsContact(contacts.inputsForms);
  modal.modalContent.replaceChildren(contacts.render());
})

// Валидация кнопок оплаты
events.on('payment:valid', () => {
  orderForm.showErrorMessage = validSetting.showErrorMessage(['formOfPayment', 'address']);
  orderForm.getDisablesButton = (validSetting.formValid.formOfPayment && validSetting.formValid.address)
})

// Валидация инпутов order
events.on('input:valid:order', () => {
  orderForm.showErrorMessage = validSetting.showErrorMessage(['payment', 'addres']);
  orderForm.getDisablesButton = (validSetting.formValid.formOfPayment && validSetting.formValid.address)
})

// Валидация инпутов contect
events.on('input:valid:contact', () => {
  contacts.showErrorMessage = validSetting.showErrorMessage(['phone', 'email']);
  contacts.getDisablesButton = (validSetting.formValid.email && validSetting.formValid.phone);
})


// Сохранение данных в ордер
events.on('seve:info:order', () => {
  order.payment = orderForm.paymentInfo;
  order.addres = orderForm.addressInfo;
  order.email = contacts.inputInfo.email;
  order.phone = contacts.inputInfo.phone;
  order.items = basketData.allIdProducts;
  order.total = basketData.totalPrice;
})

// Отправка двнных на сервер
events.on('send:info:server', () => {
  contentApi.post('/order', order.оrderArray)
    .then(() => {
      modal.clearModalContent();
      success.price = basketData.totalPrice;
      modal.modalContent.replaceChildren(success.getSuccess());
    })
    .then( () => {
        basketData.deleteAllProducts();
        contacts.clearInputValue();
        orderForm.clearInputValue();
        orderForm.clearPayment();
        basketData.deleteAllProducts(); 
        validSetting.clearFormValid();
        order.clearOrderArray();
      }
    )
    .catch((error) => contacts.showErrorMessage = error)
})