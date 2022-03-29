import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, Button } from "antd";

import { fetchCaptchaService, regService } from "./services";
import { log } from "../../utils/log";
import "./index.css";

const Reg: FC = () => {
  const [captcha, setCaptcha] = useState<any>("");

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  /** 获取验证码 */
  const fetchCaptcha = async () => {
    const [error, resp] = await fetchCaptchaService();

    if (error) {
      log({
        type: "error",
        api: "fetchCaptcha",
        message: "fetchCaptcha failed",
        error,
      });

      return;
    }

    setCaptcha(resp?.captcha);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  /** 更换验证码 */
  const onCaptchaChange = () => fetchCaptcha();

  /** 点击注册 */
  const onReg = async (values: IRegReq) => {
    const [error, resp] = await regService(values);

    if (error) {
      log({
        type: "error",
        api: "regService",
        message: "regService failed",
        error,
      });

      return;
    }

    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  return (
    <div className="page-reg">
      <Form
        form={form}
        {...formItemLayout}
        name="register"
        className="register-form"
        onFinish={onReg}
      >
        <Form.Item
          name="name"
          label="名称"
          hasFeedback
          rules={[{ required: true, message: "请输入名称!", whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          hasFeedback
          rules={[
            { required: true, message: "请输入密码!" },
            () => ({
              validator(_, value) {
                if (
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "长度至少为8，且至少有一个数字并同时包含大小写字母!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          hasFeedback
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "请再次确认密码!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("输入的两个密码不匹配!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="captcha"
          hasFeedback
          rules={[{ required: true, message: "请输入验证码!" }]}
        >
          <Row gutter={8}>
            <Col span={10}>
              <Input />
            </Col>
            <Col span={8}>
              <div
                onClick={onCaptchaChange}
                className="captcha-box"
                dangerouslySetInnerHTML={{ __html: captcha }}
              ></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Reg;
