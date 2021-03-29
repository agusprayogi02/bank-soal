import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Pelajaran = React.lazy(() => import('./views/pages/pelajaran/Pelajaran'));
const PelajaranItem = React.lazy(() => import('./views/pages/pelajaran/PelajaranItem'));

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  {path: '/pelajaran', exact: true, name: 'List Pelajaran', component: Pelajaran},
  {path: '/pelajaran/:id', exact: true, name: 'Pelajaran', component: PelajaranItem},
];

export default routes;
