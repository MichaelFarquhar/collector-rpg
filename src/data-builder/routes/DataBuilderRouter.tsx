import { Route, Switch } from "wouter";
import { dataBuilderRoutes } from "./dataBuilderRoutes.tsx";

export const DataBuilderRouter = () => {
  const routes = dataBuilderRoutes.flatMap((category) => category.routes);

  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.Page} />
      ))}
    </Switch>
  );
};
