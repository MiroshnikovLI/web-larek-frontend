export class BodyHtmlElement {
  body: HTMLElement;
  modal: HTMLElement;
  modalContent: HTMLElement;
  buttonModalClose: HTMLElement;
  gallery: HTMLElement;
  buttonBasket: HTMLElement;
  basketCounter: HTMLElement;
  cardCatalogTemplate: HTMLTemplateElement;
  cardPreviewTemplate: HTMLTemplateElement;
  cardBasketTemplate: HTMLTemplateElement;
  basketTemplate: HTMLTemplateElement;
  orderTemplate: HTMLTemplateElement;
  contactsTemplate: HTMLTemplateElement;
  successTemplate: HTMLTemplateElement;

  constructor(
    body: HTMLElement
  ) { 
    this.body = body;
    this.modal = this.body.querySelector<HTMLElement>('#modal-container');
    this.modalContent = this.modal.querySelector<HTMLElement>('.modal__content');
    this.buttonModalClose = this.modal.querySelector<HTMLElement>('.modal__close');
    this.gallery = this.body.querySelector<HTMLElement>('.gallery');
    this.buttonBasket = this.body.querySelector<HTMLElement>('.header__basket');
    this.basketCounter = this.body.querySelector<HTMLElement>('.header__basket-counter');
    this.cardCatalogTemplate = this.body.querySelector<HTMLTemplateElement>('#card-catalog');
    this.cardPreviewTemplate = this.body.querySelector<HTMLTemplateElement>('#card-preview');
    this.cardBasketTemplate = this.body.querySelector<HTMLTemplateElement>('#card-basket');
    this.basketTemplate = this.body.querySelector<HTMLTemplateElement>('#basket');
    this.orderTemplate = this.body.querySelector<HTMLTemplateElement>('#order');
    this.contactsTemplate = this.body.querySelector<HTMLTemplateElement>('#contacts');
    this.successTemplate = this.body.querySelector<HTMLTemplateElement>('#success');
  }


}

export class Page extends BodyHtmlElement {
  body: HTMLElement;

  constructor(
    body: HTMLElement, 
  ) {
    super(body)
    this.body = document.body;
  }
}

