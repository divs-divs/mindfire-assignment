import React from 'react';



const Dashboard = React.lazy(() => import('./views/Dashboard'));
const QueryCustomer = React.lazy(() => import('./views/components/SourceCustomer/queryCustomer'));
const Profile = React.lazy(() => import('./views/components/Profile/Profile'));
const ManageAirports = React.lazy(() => import('./views/components/SourceCustomer/User/manageUser'));
const ManageAircrafts = React.lazy(() => import('./views/components/SourceCustomer/User/manageAircrafts'));
const ChangePassword = React.lazy(() => import('./views/components/Profile/Password'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/manageairport', exact: true,  name: 'ManageAirports', component: ManageAirports },
  { path: '/manageaircrafts', exact: true,  name: 'ManageAircrafts', component: ManageAircrafts },
  { path: '/queryCustomer/:type', exact: false, name: 'QueryCustomer', component: QueryCustomer },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/profile/password',exact:true,name:'Password',component:ChangePassword}
];

export default routes;
