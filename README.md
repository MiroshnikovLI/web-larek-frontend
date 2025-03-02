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

Приложение построено по принципу MVP (Model-View-Presenter), который разделяет ответственность между компонентами для повышения тестируемости и гибкости.

- Model — управляет данными и взаимодействует с сервером.
- View — отвечает за отображение данных и обработку пользовательских событий.
- Presenter — служит промежуточным звеном, соединяя модель и представление.

```

# [Используется для взаимодействия с REST API.](#1): Класс Api.

# [Описывает структуру и поведение данных корзины.](#2) Класс BasketData.

# [Используется для работы с карточками продуктов и управления заказами.](#3) Класс ProductCardManager.

# [Используется для управления информацией о заказе.](#4) Класс Order.

# [Описывает структуру и поведение элементов карточки.](#5) Класс BaseCard.

# [Используется для создания элементов каталога продуктов.](#6) Класс CatologProduct.

# [Используется для создания карточек продуктов.](#7) Класс Card.

# [Используется для создания карточек продуктов в корзине.](#8) Класс CardBasket.

# [Описывает структуру и поведение элемента корзины.](#9) Класс BasketElement.

# [Описывает структуру и поведение корзины.](#10) Класс Basket.

# [Используется для работы с формами.](#11) Класс Form.

# [Используется для работы с формой заказа.](#12) Класс FormOrder.

# [Используется для работы с формой контактов.](#13) Класс FormContact.

# [Используется для отображения окна с оповещением о завершении покупки.](#14) Класс Success.

# [Используеться для валидации информации.](#15) Класс ValidForm.


# <h1>Данные</h1>

  ### <h3 id="1">Получение данных с сервера</h3>

Данный класс Api используется для взаимодействия с REST API.

Класс имеет следующие свойства:

baseUrl — строка, содержащая базовый URL для запросов;
options — объект, содержащий настройки для запросов (например, заголовки).
Конструктор класса принимает два параметра: baseUrl и options. В теле конструктора инициализируются свойства класса.

Метод handleResponse обрабатывает ответ от сервера. Если ответ успешный (response.ok), метод возвращает JSON-представление ответа. В противном случае метод возвращает ошибку.

Методы get и post выполняют GET- и POST-запросы соответственно. Они принимают URI для запроса и, в случае POST-запроса, данные для отправки. Затем они вызывают метод handleResponse для обработки ответа.

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

### <h3 id="2">Корзина</h3> 

Класс BasketData, расширяет класс Model и реализует интерфейс IBasketData. Класс описывает структуру и поведение данных корзины.

В классе объявлены следующие свойства и методы:

basketItems — массив, содержащий товары в корзине.
addProductBasket — сеттер, который добавляет товар в корзину, если его там ещё нет.
deleteAllProducts — метод, который удаляет все товары из корзины.
ProductsQuantity — геттер, который возвращает количество товаров в корзине.
allProducts — геттер, который возвращает все товары в корзине.
totalPrice — геттер, который возвращает общую сумму товаров в корзине.
deleteProduct — метод, который удаляет товар из корзины по его идентификатору.
allIdProducts - геттер, который возвращает массив строк с идентификаторами всех товаров в корзине.

```

class BasketData extends Model<IProduct> implements IBasketData {
  basketItems: IProduct[];

  set addProductBasket(product: IProduct) 

  deleteAllProducts()

  get productsQuantity(): number

  get AllProducts(): IProduct[] 

  get totalPrice(): number 

  deleteProduct(product: IProduct) 

  get allIdProducts(): string[]
}

```


### <h3 id="3">Товар</h3>

Класс ProductCardManager, реализует интерфейс IProductCardManager. Он используется для работы с карточками продуктов и управления заказами.

Класс имеет следующие свойства:

events: объект типа EventEmitter, который используется для управления событиями.
orderAmount: объект типа IOrderAmount, который содержит массив продуктов и информацию о пользователе для отправки заказа на сервер.
massProduct: массив продуктов типа IProduct.
Конструктор класса принимает объект events типа EventEmitter в качестве параметра и инициализирует свойство events.

Класс предоставляет следующие методы:

setMassProduct: устанавливает массив продуктов massProduct и вызывает событие "product:view".
getMassProduct: возвращает массив продуктов massProduct.
getToSendProduct: создаёт объект orderAmount с массивом продуктов product и информацией о пользователе userInfo, а затем возвращает его.

```

class ProductCardManager implements IProductCardManager {
  events: EventEmitter;

  оrderAmount: IOrderAmount

  massProduct: IProduct[];

  constructor(
    events: EventEmitter
  )

  setMassProduct(product: IProduct[])

  getMassProduct(): IProduct[]

  getToSendProduct(product: IProduct[], userInfo: IMassInfo)
}

```

### <h3 id="4">Информация о заказе</h3>

Класс Order, реализует интерфейс IOrder. Он используется для управления информацией о заказе.

Класс имеет одно свойство:

order: объект типа IOrderArray, который содержит информацию о заказе, такую как список товаров, способ оплаты, общая сумма, адрес доставки, email и номер телефона.
Класс предоставляет следующие методы:

set items: устанавливает список идентификаторов продуктов в свойстве items объекта order.
set payment: устанавливает информацию об оплате в свойстве payment объекта order.
set total: устанавливает общую сумму заказа в свойстве total объекта order.
set addres: устанавливает адрес доставки в свойстве address объекта order.
set email: устанавливает email в свойстве email объекта order.
set phone: устанавливает номер телефона в свойстве phone объекта order.
get orderArray: возвращает объект order.
clearOrderArray: очищает объект order, устанавливая все его свойства в начальные значения.


```

class Order implements IOrder {
  order: IOrderArray

  set items(product: string[])

  set payment(value: string)

  set total(count: number)

  set addres(shippingAddress: string)

  set email(email: string)

  set phone(phone: string)

  get оrderArray()

  clearOrderArray()
}

```

# <h1>Отображение<h1>

## <h2>Товар</h2>

### <h3 id="5">Елементы карточек</h3>

Абстрактный класс BaseCard, который расширяет класс Component и реализует интерфейс IBaseCard. Класс описывает структуру и поведение элементов карточки.

Конструктор принимает один параметр _card типа HTMLElement и вызывает конструктор родительского класса super(_card). Затем он инициализирует различные элементы карточки, используя метод querySelector и вспомогательную функцию ensureElement.

Сеттеры imgValue, titleValue, textValue, priceValue и cotegoryValue устанавливают значения для изображения, заголовка, описания, цены и категории соответственно. Они принимают объект product типа IProduct и устанавливают соответствующие свойства элементов карточки.

В классе объявлены следующие свойства:

_card — контейнер карточки;
_cotegory — элемент карточки, отображающий категорию;
_image — элемент карточки, отображающий изображение;
_title — элемент карточки, отображающий заголовок;
_price — элемент карточки, отображающий цену;
_text — элемент карточки, отображающий описание;
_button — элемент карточки, отображающий кнопку;
massCotegory — объект, содержащий отображение категорий карточек на соответствующие классы стилей.

```

class BaseCard extends Component<IBaseCard> {
  _card: HTMLElement;

  _cotegory: HTMLElement;

  _image: HTMLImageElement;

  _title: HTMLElement;

  _price: HTMLElement;

  _text: HTMLElement;

  _button: HTMLButtonElement;

  readonly massCotegory: ImassCotegory

  constructor(_card: HTMLElement)

  set imgValue(product: IProduct)

  set priceValue(product: IProduct)
  
  set cotegoryValue(product: IProduct)

  set titleValue(product: IProduct)

  set textValue(product: IProduct) 
}

```

### <h3 id="6">Вывод карточки на главый экран</h3>

Класс CatologProduct, расширяет класс BaseCard. Он используется для создания элементов каталога продуктов.

Класс имеет конструктор, который принимает два параметра:

_card: HTML-элемент, который будет использоваться для отображения карточки продукта.
click?: обработчик события click;

Также в конструкторе добавляется обработчик события click для HTML-элемента _card. При клике по карточке продукта будет вызываться метод emit объекта event с передачей события 'click:card:page' и объекта product.


```

class CatologProduct extends BaseCard {
  constructor(
    _card: HTMLElement,
    click?: IMouseClick,
  )
}

```

### <h3 id=""7>Вывод одной карточки</h3>

Класс Card, расширяет класс BaseCard. Он используется для создания карточек продуктов.

Класс имеет конструктор, который принимает три параметра:

card: HTML-элемент, который будет использоваться для отображения карточки продукта.
disabled: булевое значение.
click?: обработчик события click;

Далее проверяется значение disabled если оно равно true, то кнопка на карточке продукта будет отключена с помощью метода setDisabled родительского класса.

Затем в параметре click проверяется, содержит ли массив allProducts объекта basket объект product. Если содержит, то кнопка на карточке продукта будет отключена. Если не содержит, то добавляется обработчик события click для кнопки. При клике по кнопке будет вызываться метод emit объекта event с передачей события 'click:add:basket' и объекта product.

В классе объявлены следующие свойства:

set basketIntex(value: number) - Установливает порядковыый номер товара в корзине;

```

class Card extends CardsElements {
  constructor(
    card: HTMLElement,
    disabled: boolean,
    click?: IMouseClick,
  )
}

```
### <h3 id="8">Карточка в корзине</h3> 

Класс CardBasket, расширяет класс CardsElements. Он используется для создания карточек продуктов в корзине.

Класс имеет конструктор, который принимает два параметра:

card: HTML-элемент, который будет использоваться для отображения карточки продукта.
click?: обработчик события click;

Далее находится HTML-элемент .basket__item-index внутри card.

Затем добавляется обработчик события click для кнопки. При клике по кнопке будет вызываться метод emit объекта event с передачей события 'delet:prod:basket' и объекта element.

```

class CardBasket extends CardsElements {

  protected _basketIndex: HTMLElement;

  constructor(
    card: HTMLElement,
    click?: IMouseClick,
  )
}

```

## <h2>Корзина</h2>

### <h3 id="9">Класс BasketElement</h3>

Абстрактный класс BasketElement, расширяет класс Component и реализует интерфейс IBasketElement. Класс описывает структуру и поведение элемента корзины.

В классе объявлены следующие свойства:

basket — контейнер корзины;
basketList — элемент списка корзины;
basketButton — кнопка в корзине;
basketButtonBody: кнопка корзины на главном экране;
basketPrice — элемент цены корзины;
events — эмиттер событий.

Конструктор класса принимает два параметра: container и basketButtonBody. В теле конструктора вызывается конструктор родительского класса super(container), а затем инициализируются свойства класса.

Метод getList является геттером и возвращает элемент списка корзины.

Метод clearBasketList очищает список товаров в корзине, устанавливая содержимое элемента basketList пустым.

```

class BasketElement extends Component<IBasketElement> implements IBasketElement {
  basket: HTMLElement;

  basketList: HTMLElement;

  basketButton: HTMLButtonElement;

  basketPrice: HTMLElement;

  basketButtonBody: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    basketButtonBody: HTMLButtonElement,
  )

  get getList(): HTMLElement

  clearBasketList()
}

```

### <h3 id="10">Класс Basket</h3>

Класс Basket, расширяет класс BasketElement и реализует интерфейс IBasket. Класс описывает структуру и поведение корзины.

Конструктор класса принимает четыре параметра: container, events, basketButtonBody и click. В теле конструктора вызывается конструктор родительского класса super(container, basketButtonBody), а затем добавляется обработчик события клика на кнопку корзины. При клике на кнопку происходит вызов метода emit эмиттера событий events с параметром 'click:form:order'. Также на кнопку добавляеться обработчик события клика на кнопку. При клике на кнопку происходит вызов метода emit эмиттера событий events с параметром 'click:basket' и 'render:basket:list', а также вызываеться метод modal.openModal();

Метод convertToPriceString преобразует числовое значение в строку, представляющую цену в формате, удобном для отображения. Метод использует регулярное выражение для добавления пробелов между тройками цифр и добавляет слово «синапсов» в конце строки.

Метов set items принимает массив HTMLElement[]. После идет проверка на длинну этого массива и если она не рована false выполняется метод replaceChildren который в свою очередь принимает переменное количество аргументов и в контейнере basketList и заменяет дочение элементы на новые. В обратном случае будет также заменены все дочерние элементы basketList на один вновь созданый элемент методом 
createElement c тектовым содержимым 'В корзине нет товаров'.
```

class Basket extends BasketElement implements IBasket {
  constructor(
    container: HTMLElement,
    events: EventEmitter,
  )

  set items(items: HTMLElement[])

  convertToPriceString(value: number): string
}

```

## <h2>Формы</h2>

### <h3 id="10">Форма</h3>

Абстрактный класс Form, который расширяет класс Component и реализует интерфейс IForm. Он используется для работы с формами.

Класс имеет следующие свойства:

forms: HTML-элемент формы.
buttonSubmit: HTML-элемент кнопки отправки формы.
errorContainer: HTML-элемент контейнера ошибок формы.
inputsForms: HTMLInputElement[] - массив инпутов формы;
Конструктор класса принимает HTML-элемент формы в качестве параметра и инициализирует свойства _forms, formValid, _errorContainer и _buttonSubmit.

В конструкторе также добавляется обработчик события click для кнопки отправки формы. При клике по кнопке будет вызываться метод preventDefault, который предотвратит стандартное поведение кнопки (перезагрузку страницы).

Сетер showErrorMessage: устанавливает сообщение об ошибке в контейнере ошибок формы. Принемает строку и с помощью родительского метода setText вставляет текстовое содержимое в контейнер errorContainer.

Сетер getDisablesButton принимает одно булевое значение исходи из которого устонавливает через родительский метод setDisabled булевое значение равное полученому.

```

class Form extends Component<IForm> implements IForm{

  forms: HTMLFormElement;

  buttonSubmit: HTMLButtonElement;

  errorContainer: HTMLElement;

  constructor(forms: HTMLFormElement)

  set showErrorMessage(values: string[])

  set getDisablesButton(bool: boolean)
}

```

### <h3 id="12">Форма Ордер</h3>

Класс FormOrder, который расширяет класс Form и реализует интерфейс IFormOrder. Он используется для работы с формой заказа.

Класс имеет следующие свойства:

className: Строковое значение классаж
paymentsButton: HTMLButtonElement[] - массив кнопак оплаты:

Конструктор класса принимает HTML-элемент формы, объект EventEmitter и className в качестве параметров. В конструкторе добавляется обработчик события click для кнопки отправки формы, который вызывает метод emit объекта EventEmitter с передачей события 'click:form:content'.

Класс предоставляет следующие методы:

Геттер addressInfo который возвращает строковое значение инпута формы.

Геттер paymentInfoкоторый возвращает строковое значение выбраной кнопки оплаты.

Метод clearInputValue устонавливает у всех инпутов формы строковое значение '';

Метод clearPayment удаляет класс со всех выбраных кнопок оплаты

```

class FormOrder extends Form implements IFormOrder {

  className: string;

  paymentsButton: HTMLButtonElement[];

  constructor(
    form: HTMLFormElement,
    className: string,
    click: IMouseClick,
  )

  get paymentInfo(): string

  get addressInfo(): string

  clearInputValue()

  clearPayment()
}

```

### <h3 id="13">Форма контакты</h3>

Класс FormContact, расширяет класс Form и реализует интерфейс IFormContact. Он используется для работы с формой контактов.

Класс предоставляет следующие методы:

Гетер inputInfo который возвращает массив с двумя параметрами email и phone.

Метод clearInputValue устонавливает у всех инпутов формы строковое значение '';
```

class FormContact extends Form implements IFormContact {
  constructor(
    form: HTMLFormElement,
    click: IMouseClick,
  )

  validInput()

  setInfo(info: string, value: string): void

  get InfoContacts(): IFormsInfo

  clearValidForm()
}

```

### <h3 id="14">Оповещение об успешном совершение покупки</h3>

Класс Success, реализует интерфейс ISuccess. Он используется для отображения окна с оповещением о завершении покупки.

Класс имеет следующие свойства:

container: HTML-элемент, представляющий контейнер окна оповещения.
orderSuccessDescription: HTML-элемент, содержащий описание успешного выполнения заказа.
orderSuccessClose: HTML-элемент (кнопка), используемый для закрытия окна.
Конструктор класса принимает два параметра:

container: HTML-элемент, который будет использоваться в качестве контейнера для окна оповещения.
modal: объект, реализующий интерфейс IModalWindows, который используется для управления модальными окнами.
В конструкторе устанавливаются ссылки на элементы orderSuccessDescription и orderSuccessClose внутри контейнера. Также добавляется обработчик события click для кнопки закрытия окна, который вызывает метод closeModal объекта modal.

Класс предоставляет следующие методы:

getSuccess: возвращает контейнер окна оповещения.

Сетер price: устанавливает стоимость заказа в описании успешного выполнения заказа, преобразуя число в строку и добавляя пробелы для улучшения читаемости.

```

class Success implements ISuccess {
  container: HTMLElement;

  orderSuccessDescription: HTMLElement;

  orderSuccessClose: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    click: IMouseClick,
  )

  getSuccess() 

  set price(value: number) 
}

```

### <h3 id="15">Валидация форм</h3> 

Класс ValidForm, используеться для валидации информации.

Класс имеет следующие свойства:

events: емитор событий;

formValid: буллевый масив со значением валидации форм.

В конструкторе устонавливаются все значения formValid как false для первоначально использования. 

Класс предоставляет следующие методы:

Метод validButtonPayment который принимает масиив HTMLButtonElement и строковое значение класса. Методом перебора массив forEach устонавливаеться обработчик событий клика. Сначала методом перебора массив forEach снимаеться класс, а затем который добавляет класс на кнопку по которй кликнули.

Метод validInputsOrder принимает массив интпутов формы order и методом перебора массив forEach добавляет обработчик событий input. При вводе текста проверяеться длина ведденых данных и если она больше 0 символов то устоновливаеться булевое значение соответствующее полю ввода.

Метод validInputsContact принимает массив интпутов формы сontact и методом перебора массив forEach добавляет обработчик событий input. При вводе текста проверяеться длина ведденых данных и если она больше 0 символов то устоновливаеться булевое значение соответствующее полю ввода.

Метод showErrorMessage принимает массив строк. Методом перебора массив forEach проверяет на соответствие значения с массива ошибок. При соответтвие добавляет строку с ошибкой в массив errors. Возвращает массив errors.

Метов clearFormValid очищает массив FormValid устонавливая все значения как false.

class ValidForm {

  events: EventEmitter;

  formValid: IFormValid;

  constructor(evens: EventEmitter)

  validButtonPayment(button: HTMLButtonElement[], className: string)

  validInputsOrder(inputs: HTMLInputElement[])

  validInputsContact(inputs: HTMLInputElement[])

  showErrorMessage(values: string[])

  clearFormValid()
}

# <h1>Описание событий<h1>

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

// Валидация кнопок оплаты
'payment:valid'  

// Валидация инпутов order
'input:valid:order'  

// Валидация инпутов contect
'input:valid:contact'  

// Сохранение данных в ордер
'seve:info:order'  

// Отправка двнных на сервер  
'send:info:server'

```