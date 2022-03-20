import Login from '../pages/login';
import Reg from '../pages/reg';
import NotFound from '../pages/not-found';
import Home from "../pages/home";
import Admin from "../pages/admin";
import MenuManage from "../pages/menu-manage";

export const routers = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/reg',
        element: <Reg />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
];

export const permissionRoutersObj = {
    path: '/',
    element: <Admin />,
    children: [
        {
            index: true,
            path: '/',
            element: <Home />,
        },
        {
            path: '/home',
            element: <Home />,
            title: '首页',
        },
        {
            path: '/menu-manage',
            element: <MenuManage />,
            title: '菜单管理',
        },
    ],
};