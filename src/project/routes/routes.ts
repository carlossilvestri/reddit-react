import { SearchComponent } from '../application/components';
import { Route } from '../shared/interfaces';

export const routes: Route[] = [
    {
        to: '/main',
        path: 'main',
        Component: SearchComponent,
        name: 'Main',
        showOnNavBar: false
    }
];