import { FC, useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Tree } from "antd";

import ResultComponent from "../../components/result";
import { fetchMenus } from "./models";
import { deleteMenuService } from "./services";

const MenuManage: FC = () => {
  const [visible, setVisible] = useState(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [show, setShow] = useState(false);

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
   * 显示/关闭弹窗
   */
  const showModal = () => {
    setVisible(!visible);
  };

  /**
   * TODO:
   * 新增
   */
  const onAddClick = (values: any) => {
    showModal();

    console.log("form>>>>>>>>>", values);

    form.resetFields();
  };

  /**
   * TODO:
   * 编辑
   */
  const onEditClick = () => {};

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

  // @ts-ignore
  // const deleteMenu = useCallback((id) => {
  //     console.log('treeData>>>>>>>>', treeData);

  //     // @ts-ignore
  //     treeData.forEach((tree, index) => {
  //         // @ts-ignore
  //         if (tree.id === id) {
  //             treeData.splice(index, 1);

  //             return;
  //         }
  //         // @ts-ignore
  //         if (tree.children) {
  //             // @ts-ignore
  //             deleteMenu(tree.children, id);
  //         }
  //     });

  //     setTreeData(treeData);
  // }, [treeData]);

  const titleNode = (tree: ITree) => {
    return (
      <Row className="w-288 cursor-initial" justify="space-between">
        <Col flex="128px">{tree.name}</Col>
        <Col onClick={showModal} className="cursor-pointer" flex="28px">
          新增
        </Col>
        <Col onClick={showModal} className="cursor-pointer" flex="28px">
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

      <Modal
        visible={visible}
        okText="新增"
        cancelText="取消"
        onOk={onAddClick}
        onCancel={() => setVisible(!visible)}
        footer={null}
      >
        <Form
          form={form}
          {...formItemLayout}
          name="register"
          className="register-form"
          onFinish={onAddClick}
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
              新增
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuManage;
