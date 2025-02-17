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

```

class Api {
    // URL страницы данных
    readonly baseUrl: string;

    // Метод получение/передачи данных
    protected options: RequestInit;

    // Получить данные
    get(uri: string) 

    // Отправить данные
    post(uri: string, data: object, method: ApiPostMethods = 'POST')
}

```

## Корзина 

```

class Basket {

  // Добавления продукта в корзину
  setProductBasket(product: IProduct): void

  // Удаление продукта из корзины
  deleteProduct(product: IProduct): void

  // Удалить все продукты с корзины
  deleteAllProduct(): void

  // Получить количество товара в корзине
  getLengthProduct(): number

  // Получить полный список покупок
  getAllProduct(): IProduct[]

  // Получить полную сумму корзины
  getPriceAll(): string

  // Очиста листа покупок
  clearBasketList(): void

}

```

## Товар

```

class Product {

  // ID продукта
  id: string;

  // Описание продукта
  description: string;
  
  // Изображение продукта
  image: string;
  
  // Название продукта
  title: string;
  
  // Котегория продукта
  category: string;
  
  // Цена продукта
  price: number | null;

}

```

## Информация о заказе

```

class CustomerInformation {

  // Массив данных заказа
  protected _massInfo: IMassInfo = {
    formOfPayment: '',
    address: '',
    email: '',
    phone: '',
  }
  
  // Получить массив заказа
  getMassInfo(): IMassInfo

  // Установить информацию по строке
  setInfo(info: string, value: string): void

  // Получить информацию по строке
  getInfo(info: string): string

  // Очистить массив информации заказа
  deleteInfo(): void

}

```

# Отображение

## Товар

### Вывод карточки на главый экран
```

class CardsElements extends ICotegoreCards {

  // Отображение на главное странице
  // Устонавливает данные товара в карточку на главной странице
  renderCatologCards(product: IProduct): HTMLElement

}

```

### Вывод одной карточки
```

class CardsElements extends ICotegoreCards {

  // Отображение отдельной карточки
  // Устонавливает данные товара в карточку в одиночном товара
  renderCards(product: IProduct): HTMLElement

}

```

## Корзина 

```

class Basket {

  // Получить корзину
  getBasket(): HTMLElement

  // Получить лист корзины
  getBasketList(): HTMLElement

  // Получить кнопку корзины
  getBasketButton(): HTMLButtonElement

  // Получить Элемент цены корзины 
  getPriceBasket(): HTMLElement

}

```

## Формы

### Форма

```

class Form implements IForm {

  // Форма
  protected _forms: HTMLFormElement;

  // Кнопка отправки формы
  protected _buttonSubmit: HTMLButtonElement;

  // Контейнер ошибок формы
  protected _errorContainer: HTMLElement;

  // Массив валидации формы
  formValid: IFormValid;

  // Массив ошибок формы
  readonly _errorMessage: IErrorMessage

  // Вывод ошибок формы
  getErrorMessage(value1: string, value2: string): string

  // Получить все инпуты формы
  getInputForm(): NodeListOf<HTMLInputElement>

  // Валидация инпутов
  getValidationInput(el: boolean, mass: string): boolean

  // Отключение кнопки формы
  getDisablesButton(bool1: boolean, bool2: boolean): boolean

  // Валидация кнопак оплаты
  validButtonPayment(info: CustomerInformation): void

  // Форма
  getForm(): HTMLFormElement

  // Возвращает кнопку сабмита формы
  getButtonSubmit(): HTMLButtonElement

}

```