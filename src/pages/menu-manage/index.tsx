import { FC, useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Popconfirm,
    Row,
    Tree,
} from "antd";
import { permissionRoutersObj } from "../../routers";

const MenuManage: FC = () => {
    const [visible, setVisible] = useState(false);

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

        console.log('form>>>>>>>>>', values);

        form.resetFields();
    };

    /** 
     * TODO:
     * 编辑
     */
    const onEditClick = () => { };

    /**
     * TODO:调用接口
     * 删除该菜单
     */
    const onDelClick = () => { };

    const titleNode = (name: string) => {
        return (
            <Row className="w-288 cursor-initial" justify="space-between">
                <Col flex="128px">{name}</Col>
                <Col onClick={showModal} className="cursor-pointer" flex="28px">新增</Col>
                <Col onClick={showModal} className="cursor-pointer" flex="28px">编辑</Col>
                <Col className="cursor-pointer" flex="28px">
                    <Popconfirm
                        title="确认删除？"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={onDelClick}
                    >
                        删除
                    </Popconfirm>
                </Col>
            </Row>
        )
    };

    /** 设置treeData */
    const setTreeData = () => {
        const permissionRouters = permissionRoutersObj.children?.slice(1,);

        return permissionRouters?.map((permissionRouter, index) => {
            return {
                ...permissionRouter,
                title: titleNode(permissionRouter.title || ''),
                key: `${index}`,
            };
        });
    };

    return (
        <>
            <Tree treeData={setTreeData()} />

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
                    className='register-form'
                    onFinish={onAddClick}
                >
                    <Form.Item
                        name="name"
                        label="菜单名称"
                        hasFeedback
                        rules={[{ required: true, message: '请输入菜单名称!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="path"
                        label="路径"
                        hasFeedback
                        rules={[{ required: true, message: '请输入路径!', whitespace: true }]}
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
