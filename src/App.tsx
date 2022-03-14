import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from './routers';
import './App.css';

const App: FC = () => {
    const element = useRoutes(routes);

    return (
        <>
            {element}
        </>
    );
};

export default App;