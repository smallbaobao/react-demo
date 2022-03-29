interface IRegReq {
  name: string;
  password: string;
  captcha: string;
}

interface IRegResp extends IBaseResp {
  user: IRegReq;
}

interface ICaptchaResp extends IBaseResp {
  /** svg验证码 */
  captcha: string;
}
