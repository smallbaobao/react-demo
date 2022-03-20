import { FC } from "react";
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';

import Menu from '../../components/menu';
import Header from "../../components/header";

const Admin: FC = () => {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col flex='188px'>
                    <Menu />
                </Col>
                <Col className="m-l-24 m-t-24" flex='auto'>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
};

export default Admin;