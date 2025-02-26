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

# Данные

## Получение данных с сервера

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

## Корзина 

Класс BasketData, расширяет класс Model и реализует интерфейс IBasketData. Класс описывает структуру и поведение данных корзины.

В классе объявлены следующие свойства и методы:

basketItems — массив, содержащий товары в корзине.
addProductBasket — сеттер, который добавляет товар в корзину, если его там ещё нет.
deleteAllProducts — метод, который удаляет все товары из корзины.
ProductsQuantity — геттер, который возвращает количество товаров в корзине.
AllProducts — геттер, который возвращает все товары в корзине.
TotalPrice — геттер, который возвращает общую сумму товаров в корзине.
deleteProduct — метод, который удаляет товар из корзины по его идентификатору.
allIdProducts - геттер, который возвращает массив строк с идентификаторами всех товаров в корзине.

```

class BasketData extends Model<IProduct> implements IBasketData {
  basketItems: IProduct[];

  set addProductBasket(product: IProduct) 

  deleteAllProducts()

  get ProductsQuantity(): number

  get AllProducts(): IProduct[] 

  get TotalPrice(): number 

  deleteProduct(product: IProduct) 

  get allIdProducts(): string[]
}

```


## Товар

Класс ProductApi, реализует интерфейс IProductApi. Он используется для работы с карточками продуктов и управления заказами.

Класс имеет следующие свойства:

events: объект типа EventEmitter, который используется для управления событиями.
orderAmount: объект типа IOrderAmount, который содержит массив продуктов и информацию о пользователе для отправки заказа на сервер.
massProduct: массив продуктов типа IProduct.
Конструктор класса принимает объект events типа EventEmitter в качестве параметра и инициализирует свойство events.

Класс предоставляет следующие методы:

setMassProduct: устанавливает массив продуктов massProduct и вызывает событие "product:view".
getMassProduct: возвращает массив продуктов massProduct.
getOneProduct: проверяет, содержит ли массив massProduct указанный продукт product, и возвращает строку с результатом.
getToSendProduct: создаёт объект orderAmount с массивом продуктов product и информацией о пользователе userInfo, а затем возвращает его.

```

class ProductApi implements IProductApi {
  events: EventEmitter;

  оrderAmount: IOrderAmount

  massProduct: IProduct[];

  constructor(
    events: EventEmitter
  )

  setMassProduct(product: IProduct[])

  getMassProduct(): IProduct[]
 
  getOneProduct(product: IProduct): string

  getToSendProduct(product: IProduct[], userInfo: IMassInfo)
}

```

## Информация о заказе

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

  set addres(ShippingAddress: string)

  set email(email: string)

  set phone(phone: string)

  get оrderArray()

  clearOrderArray()
}

```

# Отображение

## Товар

### Елементы карточек

Абстрактный класс CardsElements, который расширяет класс Component и реализует интерфейс ICardsElements. Класс описывает структуру и поведение элементов карточки.

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

abstract class CardsElements extends Component<ICardsElements> implements ICardsElements {
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

### Вывод карточки на главый экран

Класс CatologProduct, расширяет класс CardsElements. Он используется для создания элементов каталога продуктов.

Класс имеет конструктор, который принимает три параметра:

_card: HTML-элемент, который будет использоваться для отображения карточки продукта.
product: объект типа IProduct, содержащий информацию о продукте.
event: объект типа EventEmitter, который используется для управления событиями.
В конструкторе вызывается конструктор родительского класса CardsElements с помощью super(_card). Затем свойства imgValue, priceValue, cotegoryValue и titleValue устанавливаются равными объекту product.

Также в конструкторе добавляется обработчик события click для HTML-элемента _card. При клике по карточке продукта будет вызываться метод emit объекта event с передачей события 'click:card:page' и объекта product.


```

class CatologProduct extends CardsElements {
  constructor(
    _card: HTMLElement,
    product: IProduct,
    event: EventEmitter,
  )
}

```

### Вывод одной карточки

Класс Card, расширяет класс CardsElements. Он используется для создания карточек продуктов.

Класс имеет конструктор, который принимает четыре параметра:

card: HTML-элемент, который будет использоваться для отображения карточки продукта.
product: объект типа IProduct, содержащий информацию о продукте.
basket: объект типа BasketData, содержащий информацию о корзине.
event: объект типа EventEmitter, который используется для управления событиями.
В конструкторе вызывается конструктор родительского класса CardsElements с помощью super(card). Затем свойства imgValue, cotegoryValue, titleValue, textValue и priceValue устанавливаются равными объекту product.

Далее проверяется значение свойства price объекта product. Если оно равно null, то кнопка на карточке продукта будет отключена с помощью метода setDisabled родительского класса. Если же значение price не равно null, то кнопка будет включена.

Затем проверяется, содержит ли массив AllProducts объекта basket объект product. Если содержит, то кнопка на карточке продукта будет отключена. Если не содержит, то добавляется обработчик события click для кнопки. При клике по кнопке будет вызываться метод emit объекта event с передачей события 'click:add:basket' и объекта product.

```

class Card extends CardsElements {
  constructor(
    card: HTMLElement,
    product: IProduct,
    basket: BasketData,
    event: EventEmitter
  )
}

```
### Карточка в корзине 

Класс CardBasket, расширяет класс CardsElements. Он используется для создания карточек продуктов в корзине.

Класс имеет конструктор, который принимает четыре параметра:

card: HTML-элемент, который будет использоваться для отображения карточки продукта.
product: объект типа IProduct, содержащий информацию о продукте (параметр необязательный).
basket: объект типа BasketData, содержащий информацию о корзине (параметр необязательный).
count: количество товара (параметр необязательный).
В конструкторе вызывается конструктор родительского класса CardsElements с помощью super(card). Затем свойства priceValue и titleValue устанавливаются равными объекту product.

Далее находится HTML-элемент .basket__item-index внутри card и устанавливается его текстовое содержимое равным значению count.

Затем добавляется обработчик события click для кнопки. При клике по кнопке будет вызываться метод deleteProduct объекта basket с передачей объекта product.

```

class CardBasket extends CardsElements {

  protected _basketIndex: HTMLElement;

  constructor(
    card: HTMLElement,
    product?: IProduct,
    basket?: BasketData,
    count?: number
  )
}

```

## Корзина 

Абстрактный класс BasketElement, расширяет класс Component и реализует интерфейс IBasketElement. Класс описывает структуру и поведение элемента корзины.

В классе объявлены следующие свойства:

basket — контейнер корзины;
basketList — элемент списка корзины;
basketButton — кнопка в корзине;
basketPrice — элемент цены корзины;
events — эмиттер событий.
Конструктор класса принимает два параметра: container и events. В теле конструктора вызывается конструктор родительского класса super(container), а затем инициализируются свойства класса.

Метод getList является геттером и возвращает элемент списка корзины.

Метод clearBasketList очищает список товаров в корзине, устанавливая содержимое элемента basketList пустым.

```

class BasketElement extends Component<IBasketElement> implements IBasketElement {
  basket: HTMLElement;

  basketList: HTMLElement;

  basketButton: HTMLButtonElement;

  basketPrice: HTMLElement;

  events: EventEmitter;

  constructor(
    container: HTMLElement,
    events: EventEmitter,
  )

  get getList(): HTMLElement

  clearBasketList()
}

```

Класс Basket, расширяет класс BasketElement и реализует интерфейс IBasket. Класс описывает структуру и поведение корзины.

Конструктор класса принимает два параметра: container и events. В теле конструктора вызывается конструктор родительского класса super(container, events), а затем добавляется обработчик события клика на кнопку корзины. При клике на кнопку происходит вызов метода emit эмиттера событий events с параметром 'click:form:order'.

Метод convertToPriceString преобразует числовое значение в строку, представляющую цену в формате, удобном для отображения. Метод использует регулярное выражение для добавления пробелов между тройками цифр и добавляет слово «синапсов» в конце строки.

```

class Basket extends BasketElement implements IBasket {
  constructor(
    container: HTMLElement,
    events: EventEmitter,
  )

  convertToPriceString(value: number): string
}

```

## Формы

### Форма

Абстрактный класс Form, который расширяет класс Component и реализует интерфейс IForm. Он используется для работы с формами.

Класс имеет следующие свойства:

_forms: HTML-элемент формы.
_buttonSubmit: HTML-элемент кнопки отправки формы.
_errorContainer: HTML-элемент контейнера ошибок формы.
formValid: объект, содержащий массив валидации формы.
Конструктор класса принимает HTML-элемент формы в качестве параметра и инициализирует свойства _forms, formValid, _errorContainer и _buttonSubmit.

В конструкторе также добавляется обработчик события click для кнопки отправки формы. При клике по кнопке будет вызываться метод preventDefault, который предотвратит стандартное поведение кнопки (перезагрузку страницы).

Сетер showErrorMessage: устанавливает сообщение об ошибке в контейнере ошибок формы. Принимает массив строк values, которые представляют ключи в объекте formValid. Если значение formValid[value] равно false, то соответствующее сообщение ошибки из объекта settings.errorMessage добавляется в массив errors. Затем все сообщения ошибок объединяются в строку и устанавливаются в качестве текстового содержимого контейнера ошибок.

Гетер InputForm: возвращает список всех инпутов формы. Использует метод querySelectorAll для поиска всех элементов с классом form__input внутри формы.

Метод ValidationInput: валидирует инпуты формы. Принимает два параметра: el (логическое значение, указывающее, является ли инпут валидным) и mass (строка, представляющая ключ в объекте formValid). Если el равно true, то устанавливает formValid[mass] в true и возвращает true. В противном случае устанавливает formValid[mass] в false и возвращает false.

Метод getDisablesButton: управляет состоянием кнопки отправки формы. Принимает два логических параметра bool1 и bool2. Если оба параметра равны true, то отключает кнопку отправки формы (_buttonSubmit.disabled = false). В противном случае блокирует кнопку (_buttonSubmit.disabled = true).

Гетер buttonPayment: возвращает список всех кнопок оплаты в форме. Использует метод querySelectorAll для поиска всех элементов с классом button_alt внутри формы.

Метод getForm: возвращает HTML-элемент формы (_forms).

Метод getButtonSubmit: возвращает HTML-элемент кнопки отправки формы (_buttonSubmit).

Метод deleteInfoFormValid: очищает валидацию формы, устанавливая все значения в объекте formValid в false.

```

abstract class Form extends Component<IForm> implements IForm{

  _forms: HTMLFormElement;

  _buttonSubmit: HTMLButtonElement;

  _errorContainer: HTMLElement;

  formValid: IFormValid;

  constructor(forms: HTMLFormElement)

  set showErrorMessage(values: string[])

  get InputForm(): NodeListOf<HTMLInputElement>

  ValidationInput(el: boolean, mass: string)

  getDisablesButton(bool1: boolean, bool2: boolean)

  get buttonPayment(): NodeListOf<Element>

  getForm()

  getButtonSubmit()

  deleteInfoFormValid() 
}

```

### Форма Ордер

Класс FormOrder, который расширяет класс Form и реализует интерфейс IFormOrder. Он используется для работы с формой заказа.

Класс имеет следующие свойства:

OrderInfo: объект, содержащий информацию о заказе, такую как способ оплаты и адрес.
Конструктор класса принимает HTML-элемент формы и объект EventEmitter в качестве параметров. В конструкторе добавляется обработчик события click для кнопки отправки формы, который вызывает метод emit объекта EventEmitter с передачей события 'click:form:content'.

Класс предоставляет следующие методы:

Гетер InfoOrder: возвращает объект OrderInfo, содержащий информацию о заказе, такую как способ оплаты и адрес.

validButtonPayment: добавляет обработчики событий click для всех кнопок оплаты в форме. При клике по кнопке устанавливает соответствующий способ оплаты в объекте OrderInfo и управляет валидацией формы.

validInput: добавляет обработчики событий input для всех инпутов формы. При изменении значения инпута устанавливает соответствующее значение в объекте OrderInfo и управляет валидацией формы.

clearValidForm: очищает форму заказа, устанавливая пустые значения для всех инпутов, убирая активный класс у кнопок оплаты и сбрасывая объект OrderInfo в начальное состояние. Также блокирует кнопку отправки формы.

```

class FormOrder extends Form implements IFormOrder {

  OrderInfo: IOrderInfo

  constructor(
    form: HTMLFormElement,
    events: EventEmitter,
  )

  validButtonPayment()

  validInput()

  get InfoOrder(): IOrderInfo

  clearValidForm()
}

```

### Форма контакты

Класс FormContact, расширяет класс Form и реализует интерфейс IFormContact. Он используется для работы с формой контактов.

Класс имеет следующее свойство:

FormsInfo: объект, содержащий данные формы, такие как телефон и email.
Конструктор класса принимает HTML-элемент формы и объект EventEmitter в качестве параметров. В конструкторе вызывается метод validInput и добавляется обработчик события click для кнопки отправки формы, который вызывает метод emit объекта EventEmitter с передачей события 'send:info:server'.

Класс предоставляет следующие методы:

Гетер InfoContacts: возвращает объект FormsInfo, содержащий данные формы.

validInput: добавляет обработчики событий input для всех инпутов формы. При изменении значения инпута устанавливает соответствующее значение в объекте FormsInfo и управляет валидацией формы.

setInfo: устанавливает значение для указанного ключа в объекте FormsInfo.

clearValidForm: очищает форму контактов, устанавливая пустые значения для всех инпутов и сбрасывая объект FormsInfo в начальное состояние. Также блокирует кнопку отправки формы.

Эти методы предоставляют возможности для работы с формой контактов, получения данных формы и очистки формы.

```

class FormContact extends Form implements IFormContact {

  FormsInfo: IFormsInfo

  constructor(
    form: HTMLFormElement,
    events: EventEmitter
  )

  validInput()

  setInfo(info: string, value: string): void

  get InfoContacts(): IFormsInfo

  clearValidForm()
}

```

### Оповещение об успешном совершение покупки

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
    modal: IModalWindows,
  )

  getSuccess() 

  set price(value: number) 
}

```

### Описание событий

```

// Открытие модального окна  
'open:modal'

// Закрытие модального окна  
'close:modal'

// Закрытие модального окна по кнопке ESC  
'close:modal:keydown:esc:set'

// Снятие слушателя с клавиатуры  
'close:modal:keydown:esc:remove'

/** Закрытие модального окна по клику вне модального окна  
close:modal:click:set

// Снятие слушателя с клика в не  модального окна  
close:modal:click:remove

// Счетчик корзины  
'counter:basket'

// Отображение карточек   
'product:view'

// Клик на карточку  
'click:card:page'

// Добавление в корзину  
'click:add:basket'

// Открытие корзины  
'click:basket'

// Отображение списка корзины  
'render:basket:list'

// Отображение формы ордер  
'click:form:order'

// Отображение формы контакт  
'click:form:content'

// Отправка двнных на сервер  
'send:info:server'

// Очистка форм и информации  
'dalete:info'

```