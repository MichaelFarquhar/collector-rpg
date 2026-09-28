import { Link, Route, Switch } from "wouter";
import { DataBuilderPage } from "./data-builder/DataBuilderPage.tsx";

const HomePage = () => {
  return (
    <div>
      <div>Hello World</div>
      <Link href="/data-builder" asChild>
        <button type="button">Data Builder</button>
      </Link>
    </div>
  );
};

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/data-builder" nest>
        <DataBuilderPage />
      </Route>
    </Switch>
  );
};
