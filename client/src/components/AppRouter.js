import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { publicRoutes } from "./../routes";
import { HOME_ROUTE } from "./../utils/consts";
import { Context } from "./../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={HOME_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
