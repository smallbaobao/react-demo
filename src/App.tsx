import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { routers, permissionRoutersObj } from './routers';
import './App.css';

const App: FC = () => {
    const element = useRoutes([...routers, permissionRoutersObj]);

    return (
        <>
            {element}
        </>
    );
};

export default App;