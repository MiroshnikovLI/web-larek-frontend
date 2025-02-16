export class CustomerInformation {
  protected _massInfo: IMassInfo = {
    formOfPayment: '',
    address: '',
    email: '',
    phone: '',
  }

  getMassInfo() {
    const mass = this._massInfo;
    return mass;
  }

  setInfo(info: string, value: string) {
    if(info) {
      this._massInfo[info as keyof typeof this._massInfo] = value;
    }
  }

  getInfo(info: string) {
    if(info) {
      return this._massInfo[info as keyof typeof this._massInfo];
    }
  }

  deleteInfo() {
    this._massInfo = {
      formOfPayment: '',
      address: '',
      email: '',
      phone: '',
    }
  }
}

export interface IMassInfo {
  formOfPayment: string;
  address: string;
  email: string;
  phone: string;
}