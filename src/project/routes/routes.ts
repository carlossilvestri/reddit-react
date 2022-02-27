import { SearchComponent } from '../application/components';
import { Route } from '../shared/interfaces';

export const routes: Route[] = [
    {
        to: '/login',
        path: 'login',
        Component: SearchComponent,
        name: 'Login',
        showOnNavBar: false
    }
];