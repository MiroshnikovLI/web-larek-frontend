import { CDN_URL } from "../utils/constants";
import { Pattern } from "./Pattern";
import { Product } from "./Product";

export class CotegoreCards extends Pattern {

  protected massCotegory = {
    'софт-скил': 'card__category_soft',
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard'
  }

  setClassCards(product: Product) {
    return this.massCotegory[product.category as keyof typeof this.massCotegory]
  }
}

export class CardsShow extends CotegoreCards {
  protected _card: HTMLElement;
  protected _cotegory: HTMLElement;
  protected _image: HTMLImageElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _text: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    _card: HTMLElement
  ) {
    super()
    this._card = _card;
    
    this._cotegory = this._card.querySelector('.card__category');
    this._image = this._card.querySelector('.card__image');
    this._title = this._card.querySelector('.card__title');
    this._price = this._card.querySelector('.card__price');
    this._text = this._card.querySelector('.card__text');
    this._button = this._card.querySelector('.card__button')
  }

  // Отображение на главное странице
  getCardsCatalogView(product: Product) {
    this._cotegory.classList.add(this.setClassCards(product));
    this._cotegory.textContent = product.category;
    this._image.src = CDN_URL + product.image;
    this._title.textContent = product.title;

    if(product.price === null) {
      this._price.textContent = `Закончился`;
    } else {
      this._price.textContent = this.getPatterPraci(`${product.price}`) + ' синапсов';
    }

    return this._card;
  }

  getProductView(product: Product) {
    this._cotegory.classList.add(this.setClassCards(product));
    this._text.textContent = product.description;
    this._cotegory.textContent = product.category;
    this._title.textContent = product.title;

    if(product.price === null) {
      this._price.textContent = `Закончился`;
    } else {
      this._price.textContent = this.getPatterPraci(`${product.price}`) + ' синапсов';
    }

    this._image.src = `${CDN_URL}${product.image}`;

    return this._card;
  }

  getCard(): HTMLElement {
    return this._card;
  }

  getButtonCard(): HTMLButtonElement {
    return this._button;
  }
}

export class CardsBasket extends CardsShow {
  protected _basketIndex: HTMLElement;
  constructor(element: HTMLElement) {
    super(element);
    this._basketIndex = this._card.querySelector('.basket__item-index'); 
  }
  
  getCardsBasketView(product: Product) {
    this._title.textContent = product.title;
    this._price.textContent = this.getPatterPraci(`${product.price}`);

    return this._card;
  }

  getIndexBasket() {
    return this._basketIndex;
  }
}


























// const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
// const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
// const cardContainer = document.querySelector('.gallery');

// export class Cards {
//   protected HtmlElement: HTMLElement;
//   protected ProductInfo: Product[];


//   constructor(
//     HtmlElement: HTMLElement,
//     ProductInfo: Product[],

//   ) {
//     this.HtmlElement = HtmlElement;
//     this.ProductInfo = ProductInfo;

//   } 

//   render(): Product[] {
//     const prod = this.ProductInfo;
//     return prod;
//   }

// }

// export class productRED {

//   massProduct: IProductData[];
//   Modalka: ModalWindows;
//   events: EventEmitter;
//   basket: Basket;
  
//   constructor( 
//     massProduct: IProductData[],
//     Modalka: ModalWindows,
//     events: EventEmitter,
//     basket: Basket,
//   ) {
//     this.massProduct = massProduct;
//     this.Modalka = Modalka;
//     this.events = events;
//     this.basket = basket;
//   } 

//   clone(el: HTMLTemplateElement) {
//    const product = cloneTemplate(el);
//    return product;
//   }

//   setImage(element: HTMLImageElement, image: string) {
//     const newImage = element.src = image;
//     return newImage;
//   }

//   setPrice(price: number) {
//     const newPrice = `${price}`;
//     return newPrice;
//   }

//   getProduct(): Product[] {

//     const prod = this.massProduct;

//     return prod;
//   }

//   render() { 
//     this.massProduct.forEach(element => {

//     const product = this.clone(templateCardCatalog);

//     const qwe = new cardsApi(  
//       element.id,
//       element.description,
//       element.image,
//       element.title,
//       element.category,
//       element.price
//     );

//     const cotegory = product.querySelector('.card__category');
//     const image = product.querySelector('.card__image') as HTMLImageElement;
//     const title = product.querySelector('.card__title');
//     const price = product.querySelector('.card__price');

//     cotegory.textContent = qwe.category;
//     title.textContent = qwe.title;

//     if(qwe.price === null) {
//       price.textContent = `Закончился`;
//     } else {
//       price.textContent = `${qwe.price} синапсов`;
//     }

//     image.src = `${CDN_URL}${qwe.image}`;
    
//     cardContainer.append(product);

//     product.addEventListener('click', () => {
//       this.Modalka.openModal();
//       this.events.emit('close:keydown:esc:set');
//       this.events.emit('close:click:set');
//       this.productPruview(qwe);
//     })
//     });
//   }

//   getButton(button: HTMLButtonElement, product: Product) {
//     if(this.basket.product.includes(product)) {
//       button.disabled = true;
//     } else {
//       button.addEventListener('click', () => {
//       this.basket.getProduct(product);
//       counterBasket.textContent = `${this.basket.getLenght()}`;

//       this.Modalka.closeModal();
//       this.Modalka.getModalContent().innerHTML = '';
//       this.basket.getPriceAll();
//     })
//   }

//   }

//   productPruview(qwe: Product) {
    
//     const red = cloneTemplate(templateCardPreview);
    
//     const cardButton = red.querySelector('.card__button') as HTMLButtonElement;

//     if(qwe.price === null) {
//       cardButton.disabled = true;
//     }

//     const cotegory = red.querySelector('.card__category');
//     const image = red.querySelector('.card__image') as HTMLImageElement;
//     const title = red.querySelector('.card__title');
//     const price = red.querySelector('.card__price');
//     const text = red.querySelector('.card__text');

//     text.textContent = qwe.description;
//     cotegory.textContent = qwe.category;
//     title.textContent = qwe.title;

//     if(qwe.price === null) {
//       price.textContent = `Закончился`;
//     } else {
//       price.textContent = `${qwe.price} синапсов`;
//     }
    
//     image.src = `${CDN_URL}${qwe.image}`;

//     this.getButton(cardButton, qwe)


//     this.Modalka.getModalContent().append(red);
//   }

// }

// export class cardsApi {
//   id: string;
//   description: string;
//   image: string;
//   title: string;
//   category: string;
//   price: number | null;

//   constructor(   
//     id: string,
//     description: string,
//     image: string,
//     title: string,
//     category: string,
//     price: number | null) {
//       this.id = id;
//       this.description = description;
//       this.image = image;
//       this.title = title;
//       this.category = category;
//       this.price = price;
//     }
// }

