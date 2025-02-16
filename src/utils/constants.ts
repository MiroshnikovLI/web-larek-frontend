export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings: ISettings = { 
  page: document.body,
  modal: document.querySelector('.modal__container'),
};

export interface ISettings {
  page: HTMLElement;
  modal: HTMLElement;
}

/* 

софт-скил: #83FA9D
другое: #FAD883
дополнительное: #B783FA
кнопка: #83DDFA
хард-скил: #FAA083

*/