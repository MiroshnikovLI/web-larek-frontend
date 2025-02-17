// import { IBodyHtmlElement, IPage } from "../types/Page";

// /**
//  * Класс Элементов страницы
//  */
// export class BodyHtmlElement implements IBodyHtmlElement {
//   /**
//    * Body
//    */
//   body: HTMLElement;
//   /**
//    * Модальное окно
//    */
//   modal: HTMLElement;
//   /**
//    * Контент модального окна
//    */
//   modalContent: HTMLElement;
//   /**
//    * Кнопка закрытия модального окна
//    */
//   buttonModalClose: HTMLElement;
//   /**
//    * Элемент галерее страницы
//    */
//   gallery: HTMLElement;
//   /**
//    * Кнопка корзины
//    */
//   buttonBasket: HTMLElement;
//   /**
//    * Счетчик корзины
//    */
//   basketCounter: HTMLElement;
//   /**
//    * Темплейт каталога карточек на главной страницы
//    */
//   cardCatalogTemplate: HTMLTemplateElement;
//   /**
//    * Темплейт показание товара
//    */
//   cardPreviewTemplate: HTMLTemplateElement;
//   /**
//    * Темплейт товара в корзине
//    */
//   cardBasketTemplate: HTMLTemplateElement;
//   /**
//    * Таплейт корзины
//    */
//   basketTemplate: HTMLTemplateElement;
//   /**
//    * Теплейт формы оплаты
//    */
//   orderTemplate: HTMLTemplateElement;
//   /**
//    * Темлейт формы контакт
//    */
//   contactsTemplate: HTMLTemplateElement;
//   /**
//    * Темплейт уведомление о завершение покупки
//    */
//   successTemplate: HTMLTemplateElement;

//   constructor(
//     body: HTMLElement
//   ) { 
//     this.body = body;
//     this.modal = this.body.querySelector<HTMLElement>('#modal-container');
//     this.modalContent = this.modal.querySelector<HTMLElement>('.modal__content');
//     this.buttonModalClose = this.modal.querySelector<HTMLElement>('.modal__close');
//     this.gallery = this.body.querySelector<HTMLElement>('.gallery');
//     this.buttonBasket = this.body.querySelector<HTMLElement>('.header__basket');
//     this.basketCounter = this.body.querySelector<HTMLElement>('.header__basket-counter');
//     this.cardCatalogTemplate = this.body.querySelector<HTMLTemplateElement>('#card-catalog');
//     this.cardPreviewTemplate = this.body.querySelector<HTMLTemplateElement>('#card-preview');
//     this.cardBasketTemplate = this.body.querySelector<HTMLTemplateElement>('#card-basket');
//     this.basketTemplate = this.body.querySelector<HTMLTemplateElement>('#basket');
//     this.orderTemplate = this.body.querySelector<HTMLTemplateElement>('#order');
//     this.contactsTemplate = this.body.querySelector<HTMLTemplateElement>('#contacts');
//     this.successTemplate = this.body.querySelector<HTMLTemplateElement>('#success');
//   }


// }
// /**
//  * Классс страницы
//  */
// export class Page extends BodyHtmlElement implements IPage {
//   /**
//    * Body
//    */
//   body: HTMLElement;

//   constructor(
//     body: HTMLElement, 
//   ) {
//     super(body)
//     this.body = document.body;
//   }
// }

