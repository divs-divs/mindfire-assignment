import React from 'react';



const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ManageAirports = React.lazy(() => import('./views/components/AirportFuelInventory/FuelInventory/manageAirport'));
const ManageAircrafts = React.lazy(() => import('./views/components/AirportFuelInventory/FuelInventory/manageAircrafts'));
const Reports = React.lazy(() => import('./views/components/AirportFuelInventory/FuelInventory/reports'));
const Transactions = React.lazy(() => import('./views/components/AirportFuelInventory/FuelInventory/transactionListing'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/manageairport', exact: true,  name: 'ManageAirports', component: ManageAirports },
  { path: '/manageaircrafts', exact: true,  name: 'ManageAircrafts', component: ManageAircrafts },
  { path: '/reports', exact: false, name: 'Reports', component: Reports },
  { path: '/transactions', exact: false, name: 'Transactions', component: Transactions },
];

export default routes;
