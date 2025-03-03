import './scss/styles.scss';
import { API_URL, } from './utils/constants';
import { Api, } from './components/base/api';
import { IAPIresponse, } from './types';
import { ModalWindows, Success } from './components/Modal';
import { CardBasket, Card, CatologProduct } from './components/Cards';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, } from './utils/utils';
import { IProduct } from './types/Product';
import { ContactsForm, OrderForm, } from './components/Form';
import { AppState, } from './components/AppData';
import { IContactField, IOrderField } from './types/AppData';
import { Basket } from './components/Basket';
import { IOrderForm } from './types/Form';

/** Подключение к серверу */
const contentApi = new Api(API_URL);

/** Обработчик событий */
const events = new EventEmitter();

/** Элементы страницы */
const pageContainers = new Page(document.querySelector('.page'));

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
const orderForm = new OrderForm(cloneTemplate(pageContainers.orderTemplate), events);

/** Форма контакты */
const formContacts = new ContactsForm(cloneTemplate(pageContainers.contactsTemplate), events)

/** Модальное окно успешного завершания покупок */
const success = new Success(cloneTemplate(pageContainers.successTemplate), {
  onClick: () => modal.closeModal()
});

/** Класс хранения и управления данными сайта */
const appData = new AppState({}, events);

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
  pageContainers.counterBasket(appData.productsQuantity)
})

// Получение массива продукта
contentApi.get('/product')
  .then((ress: IAPIresponse) => {
    appData.setMassProduct(ress.items as IProduct[]);
  })
  .catch((err) => console.log(err));

// Отображение карточек 
events.on('product:view', () => {
  const cotolog: HTMLElement[] = []
  appData.getMassProduct().map(el => {
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
  
  pageContainers.cotologProduct = cotolog;
})

// Клик на карточку
events.on('click:card:page', (product: IProduct) => {
  
  modal.openModal();

  const cardPreview = new Card(cloneTemplate(pageContainers.cardPreviewTemplate), appData.allProducts.includes(product) || product.price === null, {
    onClick: () => events.emit('click:add:basket', product)
  })

  cardPreview.imgValue = product.image;
  cardPreview.cotegoryClass = product.category;
  cardPreview.cotegoryValie = product.category;
  cardPreview.titleValue = product.title;
  cardPreview.priceValue = product.price;

  modal.modalContent = cardPreview.render();
})

// Добавление в корзину
events.on('click:add:basket', (product) => {
  appData.addProductBasket = (Object(product));
  modal.closeModal();
})

// Удаление с корзины
events.on('delet:prod:basket', (product: IProduct) => {
  appData.deleteProduct(product);
})

// Открытие корзины
events.on('click:basket', () => {
  modal.modalContent = basket.render();
  basket.basketPrice = appData.totalPrice;
})

// Отображение списка корзины  
events.on('render:basket:list', () => {
  let i: number = 1;
  basket.items = appData.allProducts.map(element => {
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
  modal.modalContent = orderForm.render({
    payment: '',
    address: '',
    valid: false,
    errors: []
  });
})

// Отображение формы контакт
events.on('click:form:content', () => {
  modal.clearModalContent();
  modal.modalContent = formContacts.render({
    phone: '',
    email: '',
    valid: false,
    errors: []
  });
})

// Слушатель изменения данных формы ордер
events.on(/^order\..*:change/, (data: { field: keyof IOrderField, value: string }) => {
  appData.setOrderField(data.field, data.value);
  if (data.field === 'payment') { orderForm.payment = data.value }
})

// Слушатель изменения данных формы констакты
events.on(/^contacts\..*:change/, (data: { field: keyof Partial<IContactField>, value: string }) => {
  appData.setContactField(data.field, data.value)
})


// Отображение ошибок формы контакт
events.on('errors:contact:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  formContacts.valid = !errors.email && !errors.phone;
  formContacts.errors = Object.values({ phone, email }).filter(i => !!i).join(',');
});

// Отображение ошибок формы ордер
events.on('errors:order:change', (errors: Partial<IOrderForm>) => {
  const { payment, address } = errors;
  orderForm.valid = !errors.payment && !errors.address;
  orderForm.errors = Object.values({ payment, address }).filter(i => !!i).join(', ');
});

// Клик на кнопку далее в форме ордер
events.on('order:submit', () => {
  modal.modalContent = formContacts.render({    
    phone: '',
    email: '',
    valid: false,
    errors: []
  });
})

// Клик на кнопку оплатить в форме контакты
events.on('contacts:submit', () => {
  contentApi.post('/order', appData.оrderArray)
    .then(() => {
      modal.clearModalContent();
      success.price = appData.totalPrice;
      modal.modalContent = success.render();
    })
    .then(() => {
      appData.clearAllData();
      formContacts.valid = true;
      formContacts.email = '';
      formContacts.phone = '';
      orderForm.valid = true;
      orderForm.payment = '';
      orderForm.address = '';
    }
    )
    .catch(error => formContacts.errors = error)
})