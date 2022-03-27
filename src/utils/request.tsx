import axios from "axios";
import { message } from "antd";
import { log } from "./log";

interface IRequestConfig {
  url: string;
  method: "get" | "post";

  /** post传参用data */
  data?: any;

  /** get传参用params */
  params?: any;
}

export async function request<R extends IBaseResp = any>(
  options: IRequestConfig
): Promise<R> {
  const { url } = options;

  let resp;
  try {
    resp = await axios(options);

    const { data = {}, status, statusText } = resp || {};

    if (status === 200 && statusText === "OK") {
      data.message && message.success(data.message);

      log({
        type: 'info',
        api: url,
        message: `${url}接口获取-成功`,
        request: options.data || options.params,
        response: data,
      });

      return data;
    }

    throw data;
  } catch (error: any) {
    message.error(error.message || "网络异常");

    log({
      type: 'error',
      api: url,
      message: `${url}接口获取-失败`,
      request: options.data || options.params,
      error,
    });

    throw error;
  }
}
