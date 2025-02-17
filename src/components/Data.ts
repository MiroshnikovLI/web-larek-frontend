// import { ICustomerInformation, IMassInfo } from "../types/Data";

// /**
//  * Класс информации о закахе
//  */
// export class CustomerInformation implements ICustomerInformation {
//   /**
//    * Массив информации о заказе
//    */
//   protected _massInfo: IMassInfo = {
//     formOfPayment: '',
//     address: '',
//     email: '',
//     phone: '',
//   }

//   /**
//    * Получить массив заказа
//    */
//   getMassInfo() {
//     const mass = this._massInfo;
//     return mass;
//   }

//   /**
//    * Установить информацию по строке
//    */
//   setInfo(info: string, value: string): void {
//     if(info) {
//       this._massInfo[info as keyof typeof this._massInfo] = value;
//     }
//   }

//   /**
//    * Получить информацию по строке
//    */
//   getInfo(info: string) {
//     if(info) {
//       return this._massInfo[info as keyof typeof this._massInfo];
//     }
//   }

//   /**
//    * Очистить массив информации заказа
//    */
//   deleteInfo() {
//     this._massInfo = {
//       formOfPayment: '',
//       address: '',
//       email: '',
//       phone: '',
//     }
//   }
// }
