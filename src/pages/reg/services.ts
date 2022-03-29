import { box } from "../../utils";
import { request } from "../../utils/request";

export async function fetchCaptchaService() {
  return box(
    request<ICaptchaResp>({
      url: "/captcha",
      method: "get",
    })
  );
}

/**
 * 注册
 * @param data 
 * @returns 
 */
export async function regService(data: IRegReq) {
  return box(
    request<IRegResp>({
      url: "/reg",
      method: "post",
      data,
    })
  );
}
