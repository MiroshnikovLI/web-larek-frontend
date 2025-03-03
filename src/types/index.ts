import { IProduct } from "./Product";

export interface IAPIresponse {
  items: IProduct[];
}

export interface IApiProductData {
  items: Promise<IProduct>;
  readonly baseUrl: string;
}

export interface IMouseClick {
  onClick: (evt: MouseEvent) => void;
}

export interface IKeydown {
  keydown: (evt: KeyboardEvent) => void;
}
 
type EventName = string | RegExp;

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}