import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Avatar,
    Modal,
    message,
} from 'antd';

import './index.css';

const Header: FC = () => {
    const navigate = useNavigate();

    const signOut = () => {
        Modal.confirm({
            title: '确认退出？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                message.success('成功退出');
                // TODO:退出接口调用
                navigate('/login');
            },
        });
    };

    return (
        <Row className="header" align='middle' justify='space-between'>
            <Col className='font-24' span={2} offset={1}>
                Demo系统
            </Col>
            <Col span={2} offset={1}>
                <Row align='middle' justify='space-around'>
                    <Col><Avatar/></Col>
                    <Col onClick={signOut} className='cursor-pointer'>退出</Col>
                </Row>
            </Col>
        </Row>
    )
};

export default Header;