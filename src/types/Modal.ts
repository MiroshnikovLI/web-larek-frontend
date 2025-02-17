export interface IModalWindows {
  /**
   * Открые модального окна
   */
  openModal(): void

  /**
   * Закрытие модального окна
   */
  closeModal(): void

  /**
   * Элемент контента модального окна 
   */
  getModalContent(): HTMLElement

  /**
   * Кнопка закрытия модального окна
   */
  getButtonClose(): HTMLButtonElement
  /**
   * Модальное окно
   */
  getModal(): HTMLElement 
  /**
   * Очистка модального окна
   */
  clearModalContent(): void
}

/**
 * Класс оповещия о заверщение покупки 
 */
export interface ISuccess {

  /**
   * Контейнер окна оповещия о заверщение покупки
   */
  getSuccess(): HTMLElement
}
