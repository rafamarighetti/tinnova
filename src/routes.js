import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Users from './components/Users';
import AddEditUser from './components/AddEditUser';

const Routes = () => {
  const Switch = () => {
  let routes = useRoutes([
    { path: "/", element: <Users />, },
    { path: "add-edit", element: <AddEditUser /> },
  ]);
  return routes;
};
  return <BrowserRouter>
    <Switch />
  </BrowserRouter>
};

export default Routes;