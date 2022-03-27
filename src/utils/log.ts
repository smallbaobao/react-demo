interface ILog {
  type: "info" | "error";
  api?: string;
  message?: string;
  request?: any;
  response?: any;
  error?: any;
}

/**
 * 简单的log日志
 */
export function log(options: ILog) {
  console[options.type]("Log日志 >>>>>>>>>：", options);
}
