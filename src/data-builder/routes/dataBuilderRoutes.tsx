import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import type { RouteComponentProps } from "wouter";
import { GiCat, GiOpenBook } from "react-icons/gi";

export type DataBuilderRoute = {
  path: string;
  label: string;
  icon: IconType;
  Page: ComponentType<RouteComponentProps>;
};

export type DataBuilderCategory = {
  label: string;
  routes: DataBuilderRoute[];
};

const FamiliarsPage = () => {
  return <div>Familiars</div>;
};

const SkillsPage = () => {
  return <div>Skills</div>;
};

export const dataBuilderRoutes: DataBuilderCategory[] = [
  {
    label: "Data",
    routes: [
      {
        path: "/familiars",
        label: "Familiars",
        icon: GiCat,
        Page: FamiliarsPage,
      },
      {
        path: "/skills",
        label: "Skills",
        icon: GiOpenBook,
        Page: SkillsPage,
      },
    ],
  },
  {
    label: "Lookups",
    routes: [],
  },
];
