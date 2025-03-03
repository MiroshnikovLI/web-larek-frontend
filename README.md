# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

### Архитектура приложения

```

Приложение построено по принципу MVP (Model-View-Presenter), который разделяет   ответственность между компонентами для повышения тестируемости и гибкости.  

- Model — управляет данными и взаимодействует с сервером.  
- View — отвечает за отображение данных и обработку пользовательских событий.  
- Presenter — служит промежуточным звеном, соединяя модель и представление.  

```

<a id="0"></a>

### [1) Класс Api.](#1) <p>Используется для взаимодействия с REST API.</p>

### [2) Класс AppState.](#2) <p>описывает состояние приложения, включая список товаров, корзину, заказ и ошибки формы.</p>

### [3) класс BaseCard.](#3) <p>описывает структуру и поведение элементов карточки.</p>

### [4) Класс CatologProduct.](#4) <p>описывает карточку товара в каталоге.</p>

### [5) Класс Card.](#5) <p>описывает карточку товара.</p>

### [6) Класс CardBasket.](#6) <p>описыват карточку в корзине.</p>

### [7) Класс Basket.](#7) <p>описывает корзину.</p>

### [8) Класс Form.](#8) <p>описывает структуру и механизм обработки ввода данных и отправки формы.</p>

### [9) Класс OrderForm.](#9) <p>описывает способ выбора оплаты и адреса доставки.</p>

### [10) Класс ContactsForm.](#10) <p>описывает форму ввода контактных данных.</p>

### [11) Класс Success.](#11) <p>описывает окна оповещения завершения покупки.</p>

### [12) Описание событий.](#12)

> <h1 style="font-weight: bold; color: #FFF;">Данные</h1>

<h3 id="1" style="font-weight: bold;">Получение данных с сервера</h3>

Данный класс Api используется для взаимодействия с REST API.

Класс имеет следующие свойства:

- baseUrl — строка, содержащая базовый URL для запросов;
- options — объект, содержащий настройки для запросов (например, заголовки).

Конструктор класса принимает два параметра: baseUrl и options. В теле конструктора инициализируются свойства класса.

- Метод handleResponse обрабатывает ответ от сервера. Если ответ успешный (response.ok), метод возвращает JSON-представление ответа. В противном случае метод возвращает ошибку.

- Методы get и post выполняют GET- и POST-запросы соответственно. Они принимают URI для запроса и, в случае POST-запроса, данные для отправки. Затем они вызывают метод handleResponse для обработки ответа.

```

class Api {
  readonly baseUrl: string;
  protected options: RequestInit;
  constructor(baseUrl: string, options: RequestInit = {})

  protected handleResponse(response: Response): Promise<object> 

  get(uri: string) 

  post(uri: string, data: object, method: ApiPostMethods = 'POST') 
}


```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id='2'>Класс AppState</h3>

Класс AppState, который расширяет класс Model и реализует интерфейс IAppState. Он описывает состояние приложения, включая список товаров, корзину, заказ и ошибки формы.

Основные свойства класса:

- massProduct: массив товаров.
- basketItems: массив товаров в корзине.
- order: объект заказа, содержащий поля для контактной информации, оплаты, общей суммы и т. д.
- formErrors: объект ошибок формы.

Класс содержит следующие методы:

- Метод: setContactField: устанавливает значение поля контактной информации в объекте order и вызывает метод validateContacts для проверки правильности заполнения полей.

- Метод: setOrderField: устанавливает значение поля заказа в объекте order и вызывает метод validateOrder.

- Метод: validateContacts: Проверяет правильность заполнения полей заказа (email и phone). Устанавливает соответствующие ошибки в объекте formErrors. Вызывает super.emitChanges для уведомления о изменении ошибок. Возвращает true, если все поля заполнены правильно, и false в противном случае.

- Метод validateOrder: Проверяет правильность заполнения полей заказа (payment и address). Устанавливает соответствующие ошибки в объекте formErrors. Вызывает super.emitChanges для уведомления о изменении ошибок. Возвращает true, если все поля заполнены правильно, и false в противном случае.

- Сетер AddProductBasket: Добавляет товар в корзину, если его там ещё нет. Вызывает super.emitChanges для уведомления об изменении количества товаров в корзине и необходимости перерендеринга списка товаров в корзине.

- Метод deleteAllProducts: Очищает корзину, устанавливая длину массива basketItems в 0. Вызывает super.emitChanges для уведомления об изменении количества товаров в корзине.

- Гетер ProductsQuantity: Возвращает количество товаров в корзине.

- Гетер allProducts: Возвращает массив всех товаров в корзине.

- Гетер TotalPrice: Рассчитывает общую цену товаров в корзине, суммируя цены всех товаров.

- Метод deleteProduct: Удаляет указанный товар из корзины, фильтруя массив basketItems по id. вызывают метод emitChanges для уведомления о различных событиях, изменение количества товаров, клик по корзине и необходимость перерендеринга списка товаров в корзине.

- Гетер allIdProducts: Возвращает массив идентификаторов всех товаров в корзине. Проходит по массиву allProducts и добавляет id каждого товара в результирующий массив.

- Метод setMassProduct: Устанавливает массив товаров massProduct. Вызывает super.emitChanges для уведомления о изменении списка товаров.

- Метод getMassProduct: Возвращает массив товаров massProduct.

- Гетер оrderArray: Устанавливает общую цену заказа total и массив идентификаторов товаров items в объекте order. Возвращает объект order.

- Метод clearAllData: Очищает корзину, вызывая метод deleteAllProducts. Устанавливает все поля объекта order в начальное состояние.

``` 


class AppState extends Model<IAppState> {

  protected massProduct: IProduct[];

  protected basketItems: IProduct[];

  protected order: IOrderArray

  protected formErrors: FormErrors;

  setContactField(field: keyof IContactField, value: string)

  setOrderField(field: keyof IOrderField, value: string)

  validateContacts()

  validateOrder()

  set addProductBasket(product: IProduct)

  deleteAllProducts()

  get productsQuantity(): number

  get allProducts(): IProduct[]

  get totalPrice(): number

  deleteProduct(product: IProduct) 

  get allIdProducts(): string[]

  setMassProduct(product: IProduct[])

  getMassProduct(): IProduct[]

  get оrderArray()

  clearAllData()
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

> <h1>Отображение</h1>
  
<h2>Товар</h2>

<h3 id="3">Елементы карточек</h3>

Абстрактный класс BaseCard, который расширяет класс Component и реализует интерфейс IBaseCard. Класс описывает структуру и поведение элементов карточки.

Конструктор принимает один параметр _card типа HTMLElement и вызывает конструктор родительского класса super(_card). Затем он инициализирует различные элементы карточки, используя метод querySelector и вспомогательную функцию ensureElement.

В классе объявлены следующие свойства:

- _card — контейнер карточки;
- _cotegory — элемент карточки, отображающий категорию;
- _image — элемент карточки, отображающий изображение;
- _title — элемент карточки, отображающий заголовок;
- _price — элемент карточки, отображающий цену;
- _text — элемент карточки, отображающий описание;
- _button — элемент карточки, отображающий кнопку;
- massCotegory — объект, содержащий отображение категорий карточек на соответствующие классы стилей.

Класс содержит следующие методы:

- Сетер set imgValue: устоновливает изображение.

- Сетер set priceValue устоновливает цену продукта.

- Сетер set cotegoryClass: устоновливает класс категории продукта.

- Сетер set cotegoryValie: устоновливает текс котегории продукта.

- Сетер set titleValue: устоновливает заголовок продукта.

- Сетер set textValue: устоновливает описание продукта.

```

export abstract class BaseCard extends Component<IBaseCard> { 
  
  protected _card: HTMLElement;

  protected _cotegory: HTMLElement;

  protected _image: HTMLImageElement;

  protected _title: HTMLElement;

  protected _price: HTMLElement;

  protected _text: HTMLElement;

  protected _button: HTMLButtonElement;

  readonly massCotegory: ImassCotegory

  constructor(
    _card: HTMLElement,
  )

  set imgValue(value: string)

  set priceValue(value: number | null)

  set cotegoryClass(className: string)

  set cotegoryValie(value: string)

  set titleValue(value: string)

  set textValue(value: string)
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="4">Вывод карточки на главый экран</h3>

Класс CatologProduct, который расширяет класс BaseCard. Класс CatologProduct представляет собой карточку товара в каталоге и добавляет обработчик события клика на эту карточку.

Основные особенности класса:

Конструктор принимает корневой элемент карточки _card и опциональный объект click, реализующий интерфейс IMouseClick.
В конструкторе добавляется обработчик события клика на карточку, который вызывает метод onClick объекта click.

Также в конструкторе добавляется обработчик события click для HTML-элемента _card. При клике по карточке продукта будет вызываться метод emit объекта event с передачей события 'click:card:page' и объекта product.


```

class CatologProduct extends BaseCard {
  constructor(
    _card: HTMLElement,
    click?: IMouseClick,
  )
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="5">Вывод одной карточки</h3>

Класс Card, который расширяет класс BaseCard. Класс Card представляет собой карточку товара и добавляет возможность управления состоянием кнопки на карточке (например, для добавления товара в корзину) и обработки кликов по этой кнопке.

Основные особенности класса:

Конструктор принимает корневой элемент карточки card, логическое значение disabled и опциональный объект click, реализующий интерфейс IMouseClick.
Если disabled имеет значение true, устанавливается свойство disabled для кнопки карточки.
В конструкторе добавляется обработчик события клика на кнопку карточки, который вызывает метод emit объекта event с передачей события. 'click:add:basket'

```

class Card extends CardsElements {
  constructor(
    card: HTMLElement,
    disabled: boolean,
    click?: IMouseClick,
  )
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="6">Карточка в корзине</h3> 

Класс CardBasket, расширяет класс CardsElements. Он используется для создания карточек продуктов в корзине.

Класс имеет конструктор, который принимает два параметра:

card: HTML-элемент, который будет использоваться для отображения карточки продукта.
click?: обработчик события click;

Далее находится HTML-элемент .basket__item-index внутри card.

Затем добавляется обработчик события click для кнопки. При клике по кнопке будет вызываться метод emit объекта event с передачей события 'delet:prod:basket' и объекта element.

В классе объявлены следующие свойства:

set basketIntex(value: number) - Установливает порядковыый номер товара в корзине;

```

class CardBasket extends CardsElements {

  protected _basketIndex: HTMLElement;

  constructor(
    card: HTMLElement,
    click?: IMouseClick,
  )

  set basketIntex(value: number)
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h2>Корзина</h2>

<h3 id="7">Корзина</h3> 

Класс Basket, расширяет класс Component и реализует интерфейс IBasket. Он описывает корзину для покупок с различными элементами управления и функциональностью.

Основные свойства класса:

basket: корневой элемент корзины.
basketList: список товаров в корзине.
basketButton: кнопка для оформления заказа.
basketButtonBody: дополнительная кнопка, возможно, для управления содержимым корзины.
_basketPrice: элемент для отображения общей цены товаров в корзине.
Конструктор класса принимает следующие параметры:

container: корневой элемент, в который будет добавлена корзина.
events: объект, реализующий интерфейс IEvents, для работы с событиями.
basketButtonBody: кнопка для управления содержимым корзины.
click: объект, реализующий интерфейс IMouseClick, для обработки кликов по кнопкам.
В конструкторе устанавливаются ссылки на элементы корзины и добавляются обработчики событий для кнопок.

Класс предоставляет следующие методы:

Сетер basketPrice: устонавливает значение стоимости корзины.
Геттер getList: возвращает контейнер basketList.
Сеттер items: устонавливает переданный массив элементов в basketList и снимает запрет на использование кнопки оформления заказа (basketButton).
Метод clearBasketList: очищает содержимое basketList, устанавливая его свойство innerHTML в пустую строку.

```

class Basket extends Component<IBasket> implements IBasket {
  
  protected basket: HTMLElement;

  protected basketList: HTMLElement;

  protected basketButton: HTMLButtonElement;

  protected basketButtonBody: HTMLButtonElement;

  protected _basketPrice: HTMLElement;

  constructor(
    container: HTMLElement,
    events: IEvents,
    basketButtonBody: HTMLButtonElement,
    click: IMouseClick,
  )

  set basketPrice(value: number)

  get getList(): HTMLElement

  set items(items: HTMLElement[])

  clearBasketList()
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h2>Формы</h2>

<h3 id="8">Форма</h3>

Класс Form, который расширяет класс Component. Класс Form представляет собой базовую структуру для работы с HTML-формами и включает в себя механизмы для обработки ввода данных и отправки формы.

Основные особенности класса:

- Конструктор принимает корневой элемент формы container и объект events, реализующий интерфейс IEvents.
- В конструкторе устанавливаются ссылки на кнопку отправки формы _submit и элемент для отображения ошибок _errors.
- Добавляются обработчики событий для ввода данных в поля формы и отправки формы:
- При вводе данных в поле формы вызывается метод onInputChange, который передаёт изменения в систему событий.
- При отправке формы предотвращается стандартное поведение (перезагрузка страницы) и вызывается событие для обработки отправки формы.

Класс предоставляет следующие методы:

- Метод onInputChange: передаёт изменения введённых данных в систему событий.

- Метод setValid: устанавливает состояние кнопки отправки формы в зависимости от параметра value: если value равно true, кнопка активируется, иначе — блокируется.

- Метод setErrors: устанавливает текст ошибок в элементе _errors.

- Метод render: обновляет состояние формы на основе переданного объекта state, включая отображение валидности и ошибок, а также обновление входных данных.

```

class Form<T> extends Component<IFormState> {

  protected _submit: HTMLButtonElement;

  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents)

  protected onInputChange(field: keyof T, value: string)

  set valid(value: boolean)

  set errors(value: string)

  render(state: Partial<T> & IFormState)
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="9">Форма ордер</h3>

Класс OrderForm, который расширяет класс Form. Класс OrderForm представляет собой форму для выбора способа оплаты и содержит логику для управления кнопками выбора способа оплаты (картой или наличными).

Основные особенности класса:

- Конструктор принимает корневой элемент формы container и объект events, реализующий интерфейс IEvents.
- В конструкторе устанавливаются ссылки на кнопки выбора способа оплаты _cardButton и _cashButton.
- Добавляются обработчики событий для кликов по кнопкам выбора способа оплаты, которые вызывают метод onInputChange для передачи изменений в систему событий.

Класс предоставляет следующие методы:

- Метод disableButtons: удаляет класс button_alt-active у кнопок выбора способа оплаты.
- Метод setPayment: добавляет или удаляет класс button_alt-active у кнопок в зависимости от переданного значения value.
- Метод setAddress: устанавливает значение поля адреса в форме.

```

class OrderForm extends Form<IOrderField> {

  protected _cardButton: HTMLButtonElement;

  protected _cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents)

  disableButtons()

  set payment(value: string)

  set address(value: string)
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="10">Форма контакты</h3>

Класс ContactsForm, который расширяет класс Form. Класс ContactsForm представляет собой форму для ввода контактных данных, таких как телефон и email.

Основные особенности класса:

- Конструктор принимает корневой элемент формы container и объект events, реализующий интерфейс IEvents.

Класс предоставляет следующие методы:

- Сеттер phone устанавливает значение поля ввода телефона в форме.
- Сеттер email устанавливает значение поля ввода email в форме.

```

class ContactsForm extends Form<IContactField> {

  constructor(container: HTMLFormElement, events: IEvents)

  set phone(value: string)

  set email(value: string)
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

<h3 id="11">Оповещение об успешном совершение покупки</h3>

Класс Success, реализует интерфейс ISuccess. Он используется для отображения окна с оповещением о завершении покупки.

Класс имеет следующие свойства:

- container: HTML-элемент, представляющий контейнер окна оповещения.
- orderSuccessDescription: HTML-элемент, содержащий описание успешного выполнения заказа.
- orderSuccessClose: HTML-элемент (кнопка), используемый для закрытия окна.

Конструктор класса принимает два параметра:

container: HTML-элемент, который будет использоваться в качестве контейнера для окна оповещения.
modal: объект, реализующий интерфейс IModalWindows, который используется для управления модальными окнами.
В конструкторе устанавливаются ссылки на элементы orderSuccessDescription и orderSuccessClose внутри контейнера. Также добавляется обработчик события click для кнопки закрытия окна, который вызывает метод closeModal объекта modal.

Класс предоставляет следующие методы:

- Сетер price: устанавливает стоимость заказа в описании успешного выполнения заказа, преобразуя число в строку и добавляя пробелы для улучшения читаемости.

```

class Success implements ISuccess {
  container: HTMLElement;

  orderSuccessDescription: HTMLElement;

  orderSuccessClose: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    click: IMouseClick,
  )

  set price(value: number) 
}

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>

> <h1 id="12">Описание событий</h1>


```

// Открытие модального окна  
'open:modal'

// Закрытие модального окна  
'close:modal'

// Счетчик корзины  
'counter:basket'

// Отображение карточек   
'product:view'

// Клик на карточку  
'click:card:page'

// Добавление в корзину  
'click:add:basket'

// Удаление с корзины
'delet:prod:basket'  

// Открытие корзины  
'click:basket'

// Отображение списка корзины  
'render:basket:list'

// Отображение формы ордер  
'click:form:order'

// Отображение формы контакт  
'click:form:content'

// Слушатель изменения данных формы ордер  
/^order\..*:change/

// Слушатель изменения данных формы констакты  
/^contacts\..*:change/

// Отображение ошибок формы контакт  
'errors:contact:change'

// Отображение ошибок формы ордер  
'errors:order:change'

// Клик на кнопку далее в форме ордер
'order:submit'

// Клик на кнопку оплатить в форме контакты  
'contacts:submit'

// Отправка двнных на сервер  
'send:info:server'

```

<a><h1 style="margin-left: 90%;">[Наверх &#8593;](#0)</h1></a>