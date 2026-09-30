import { Route, Switch } from "wouter";
import { DataBuilderContent } from "../content/DataBuilderContent.tsx";
import { dataBuilderRoutes } from "./dataBuilderRoutes.tsx";

export const DataBuilderRouter = () => {
  const routes = dataBuilderRoutes.flatMap((category) => category.routes);

  return (
    <Switch>
      {routes.map((route) => {
        const Page = route.Page;

        return (
          <Route key={route.path} path={route.path}>
            {(params) => (
              <DataBuilderContent info={route.info}>
                <Page params={params} />
              </DataBuilderContent>
            )}
          </Route>
        );
      })}
    </Switch>
  );
};
