import axios from "axios";
import {
    message,
} from 'antd';

const request = async (options: {
    url: string,
    method: 'get' | 'post',
    data?: any,
}) => {
    let resp;
    try {
        resp = await axios(options);

        const { data = {}, status, statusText } = resp || {};

        if (status === 200 && statusText === 'OK') {
            data.message && message.success(data.message);

            console.log(`${options.url}接口获取-成功>>>`, data);

            return data;
        }

        throw data;
    } catch (error) {
        // @ts-ignore
        message.error(error.message || '网络异常');
        console.log(`${options.url}接口获取-失败>>>`, error);

        return error;
    }
};

export default request;