import './scss/styles.scss';
import { API_URL, } from './utils/constants';
import { Api, } from './components/base/api';
import { IAPIresponse, } from './types';
import { ModalWindows, Success } from './components/Modal';
import { CardsBasket, CardsElements} from './components/Cards';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { Product, ProductApi } from './components/Product';
import { cloneTemplate } from './utils/utils';
import { CustomerInformation } from './components/Data';
import { Form } from './components/Form';
import { ICard } from './types/Cards';

/**
 * Подключение к серверу
 */
const contentApi = new Api(API_URL);

/**
 *  Подписка на обработчик событий
 */ 
const events = new EventEmitter();

/**
 * Продукт
 */
const product = new ProductApi(events);

/**
 * Элементы страницы
 */ 
const pageCont = new Page(document.querySelector('.page'));

/**
 * Модальное окно
 */ 
const modalka = new ModalWindows(pageCont.body, pageCont.modal, 'modal_active', events);

/**
 * Корзина
 */
const basket = new Basket(cloneTemplate(pageCont.basketTemplate));

/**
 * Информации о клиенте
 */
const information = new CustomerInformation();

/**
 * Закрытие модального окна по кнопке ESC
 */
const closeEsc = function(evt: KeyboardEvent) {
  if(evt.code === 'Escape') {
    modalka.closeModal();
  }
}

events.on('close:modal:keydown:esc:set', () => 
  pageCont.body.addEventListener('keydown', closeEsc)
);

events.on('close:modal:keydown:esc:remove', () => 
  pageCont.body.removeEventListener('keydown', closeEsc)
);

/**
 * Закрытие модального окна по клику вне модального окна
 */
const closeKlick = function(evt: Event) {
  const el = evt.target as HTMLElement;
  if(el.id === 'modal-container') {
    modalka.closeModal();
  }
}

events.on('close:modal:click:set', () => 
  modalka.getModal().addEventListener('click', closeKlick)
);

events.on('close:modal:click:remove', () => 
  modalka.getModal().removeEventListener('click', closeKlick)
);

/**
 * Закрытие модального окна по кнопке крестик
 */
modalka.getButtonClose().addEventListener('click', () => modalka.closeModal())

/**
 * Кнопка корзины на главном экране
 */
pageCont.buttonBasket.addEventListener('click', () => {
  modalka.openModal();
  events.emit('click:basket');
})

/**
 * Счетчик корзины
 */
events.on('counter:basket', () => pageCont.basketCounter.textContent = `${basket.getLengthProduct()}`)

/**
 * Получение массива продукта
 */
contentApi.get('/product')
.then((ress: IAPIresponse)  => {
  product.setMassProduct(ress.items as ICard[]);
})
.catch((err) => console.log(err));

/**
 * Отображение карточек 
 */
events.on('product:view', () => {
  product.getMassProduct().forEach(el => {
    const show = new CardsElements(cloneTemplate(pageCont.cardCatalogTemplate));
    const prod = new Product(
      el.id,
      el.description,
      el.image,
      el.title,
      el.category,
      el.price
    )
    
    show.getCard().addEventListener('click', () => events.emit('click:card:page', prod))

    pageCont.gallery.append(show.renderCatologCards(prod))
  })
})

/**
 * Клик на карточку
 */
events.on('click:card:page', (product) => {
  modalka.openModal();
  const show = new CardsElements(cloneTemplate(pageCont.cardPreviewTemplate))
  
  if(Object(product).price === null) {
    show.getButtonCard().disabled = true;
  }

  if(basket.getAllProduct().includes(Object(product))) {
    show.getButtonCard().disabled = true;
  } else {
    show.getButtonCard().addEventListener('click', () => events.emit('click:add:basket', product))
  }

  pageCont.modalContent.append(show.renderCards(Object(product)));
})

/**
 * Добавление в корзину
 */
events.on('click:add:basket', (product) => {
  basket.setProductBasket(Object(product));
  modalka.closeModal();
  events.emit('counter:basket');
})

/**
 * Открытие корзины
 */
events.on('click:basket', () => {
  modalka.openModal();
  basket.clearBasketList();
  modalka.getModalContent().append(basket.getBasket());
  basket.getPriceBasket().textContent = `${basket.getPriceAll()} синапсов`;

  let i = 0;

  basket.getAllProduct().forEach(element => {
    const show = new CardsBasket(cloneTemplate(pageCont.cardBasketTemplate));

    show.getIndexBasket().textContent = `${i = i + 1}`;

    show.getButtonCard().addEventListener('click', () => {
      basket.deleteProduct(element);
      events.emit('click:basket');
      events.emit('counter:basket');
    })

    basket.getBasketList().append(show.getCardsBasketView(element))
  });

  if(basket.getLengthProduct() > 0) {
    basket.getBasketButton().disabled = false;
    basket.getBasketButton().addEventListener('click', () => {
      events.emit('click:form:order');
    })
  } else {
    basket.getBasketButton().disabled = true;
  }
})

/**
 * Отображение формы ордер
 */
events.on('click:form:order', () => {
  modalka.clearModalContent();
  const form = new Form(cloneTemplate(pageCont.orderTemplate))
  modalka.getModalContent().append(form.getForm());
  form.validButtonPayment(information);
  form.getInputForm().forEach(element => {
    if(information.getInfo(element.name)) {
      element.value = information.getInfo(element.name)
    }
    element.addEventListener('input', () => {
      form.getValidationInput((element.value.length > 0), element.name);
      form.getErrorMessage('formOfPayment', 'address');
      information.setInfo(element.name, element.value);
      form.getDisablesButton(form.formValid.address, form.formValid.formOfPayment);
    })
  });
  
  form.getButtonSubmit().addEventListener('click', () => {
    events.emit('click:form:content');
  })
  
})

/**
 * Отображение формы контакт
 */
events.on('click:form:content', () => {
  modalka.clearModalContent();
  const form = new Form(cloneTemplate(pageCont.contactsTemplate));
  modalka.getModalContent().append(form.getForm());
  form.getInputForm().forEach(element => {
    if(information.getInfo(element.name)) {
      element.value = information.getInfo(element.name)
    }
    element.addEventListener('input', () => {
      form.getValidationInput((element.value.length > 0), element.name);
      form.getErrorMessage('phone', 'email');
      information.setInfo(element.name, element.value);
      form.getDisablesButton(form.formValid.phone, form.formValid.email);
    })
  });
  
  form.getButtonSubmit().addEventListener('click', () => {
    events.emit('send:info:server');
    events.emit('click:pay');
  })
})

/**
 * Отправка данных на сервер
 */
events.on('send:info:server', async () => {
   contentApi.post('', product.getToSendProduct(basket.getAllProduct(), information.getMassInfo()))
})

/**
 * Клик на кнопку оплатить 
 */
events.on('click:pay', () => {
  modalka.getModalContent().innerHTML = '';
  const success = new Success(cloneTemplate(pageCont.successTemplate), basket, modalka);
  modalka.getModalContent().append(success.getSuccess());
  basket.deleteAllProduct();
  information.deleteInfo();
  events.emit('counter:basket');
})