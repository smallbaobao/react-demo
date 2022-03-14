import React from "react";
import { RouteObject } from 'react-router-dom';

import Login from '../pages/login';
import Reg from '../pages/reg';
import NotFound from '../pages/not-found';

const routes: RouteObject[] = [
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
    },
];

export default routes;