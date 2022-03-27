interface IRegReq {
  name: string;
  password: string;
  captcha: string;
}

interface IRegResp extends IBaseResp {
  user: IRegReq;
}
