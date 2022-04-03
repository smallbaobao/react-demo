import { FC, useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Tree } from "antd";

import ResultComponent from "../../components/result";
import { fetchMenus } from "./models";
import {
  createMenuService,
  deleteMenuService,
  updateMenuService,
} from "./services";
import { log } from "../../utils/log";

const MenuManage: FC = () => {
  const [visible, setVisible] = useState(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    onFinish: async (values: any) => {},
    btnText: "",
  });

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

  /** 初始获取菜单数据并赋值 */
  const initData = async () => {
    const trees = await fetchMenus();

    if (!trees) {
      setShow(true);

      return;
    }

    setTreeData(getTreeData(trees));
  };

  /** 递归增加菜单title */
  const getTreeData = (trees: ITree[]) => {
    trees.forEach((tree) => {
      tree.title = titleNode(tree);

      if (tree.children) {
        getTreeData(tree.children);
      }
    });

    return trees;
  };

  useEffect(() => {
    initData();
  }, []);

  /**
   * 显示弹窗
   */
  const showModal = () => {
    setVisible(true);
  };

  /**
   * 关闭弹窗并重置表单
   */
  const onCancel = () => {
    setVisible(false);

    form.resetFields();
  };

  /**
   * 新增
   */
  const onAddClick = async (tree: ITree) => {
    showModal();

    setModalData({
      onFinish: (values) => createMenu(values, tree),
      btnText: "新增",
    });
  };

  /**
   * 新增请求
   */
  const createMenu = async (values: any, tree: ITree) => {
    const [error, resp] = await createMenuService({
      ...values,
      parentId: tree.id,
    });

    if (error) {
      log({
        type: "error",
        api: "createMenuService",
        message: "createMenuService failed",
        error,
      });

      return;
    }

    onCancel();

    initData();
  };

  /**
   * 点击编辑按钮， 显示弹窗并赋值form事件
   */
  const onEditClick = (tree: ITree) => {
    showModal();
    form.setFieldsValue({ ...tree });

    setModalData({
      onFinish: (values) => updateMenu(values, tree),
      btnText: "编辑",
    });
  };

  /**
   * 编辑请求
   */
  const updateMenu = async (values: any, tree: ITree) => {
    const [error, resp] = await updateMenuService({ id: tree.id, ...values });

    if (error) {
      log({
        type: "error",
        api: "updateMenuService",
        message: "updateMenuService failed",
        error,
      });

      return;
    }

    onCancel();

    initData();
  };

  /**
   * 删除菜单
   * @param id
   */
  const onDelClick = async (id: IMenuReq["id"]) => {
    const [error, resp] = await deleteMenuService(id);

    if (error) {
      return;
    }

    initData();
  };

  const titleNode = (tree: ITree) => {
    return (
      <Row className="w-288 cursor-initial" justify="space-between">
        <Col flex="128px">{tree.name}</Col>
        <Col
          onClick={() => onAddClick(tree)}
          className="cursor-pointer"
          flex="28px"
        >
          新增
        </Col>
        {tree.key !== "all" && (
          <>
            <Col
              onClick={() => onEditClick(tree)}
              className="cursor-pointer"
              flex="28px"
            >
              编辑
            </Col>
            <Col className="cursor-pointer" flex="28px">
              <Popconfirm
                title="确认删除？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => onDelClick(tree.id)}
              >
                删除
              </Popconfirm>
            </Col>
          </>
        )}
      </Row>
    );
  };

  return (
    <>
      {!show && <Tree treeData={treeData} />}

      <ResultComponent
        show={show}
        status="error"
        title="数据出错啦"
        subTitle="刷新再试试"
        leftBtnText="刷新"
        leftBtnType="primary"
        onLeftBtnClick={() => initData()}
      />

      <Modal visible={visible} onCancel={onCancel} footer={null}>
        <Form
          form={form}
          {...formItemLayout}
          name="register"
          className="register-form"
          onFinish={modalData.onFinish}
        >
          <Form.Item
            name="name"
            label="菜单名称"
            hasFeedback
            rules={[
              { required: true, message: "请输入菜单名称!", whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="path"
            label="路径"
            hasFeedback
            rules={[
              { required: true, message: "请输入路径!", whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {modalData.btnText}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuManage;
