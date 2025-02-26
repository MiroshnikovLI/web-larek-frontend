/** Базовый компонент */
export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement) {
  }

  // Переключить класс
  toggleClass(element: HTMLElement, className: string, force?: boolean) {
      element.classList.toggle(className, force);
  }

  // Сменить статус блокировки
  setDisabled(element: HTMLElement, state: boolean) {
      if (element) {
          if (state) element.setAttribute('disabled', 'disabled');
          else element.removeAttribute('disabled');
      }
  }

  // Вернуть корневой DOM-элемент
  render(data?: Partial<T>): HTMLElement {
      Object.assign(this as object, data ?? {});
      return this.container;
  }
}