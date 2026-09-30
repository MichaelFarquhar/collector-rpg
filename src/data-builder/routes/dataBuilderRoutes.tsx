import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import type { RouteComponentProps } from "wouter";
import { GiCat, GiOpenBook } from "react-icons/gi";
import { familiarAlignments, familiarSchema } from "../../schemas/familiars.schema.ts";
import { skillCategories, skillSchema } from "../../schemas/skills.schema.ts";
import { DataBuilderField } from "../inputs/DataBuilderField/DataBuilderField.tsx";
import { DataBuilderForm } from "../inputs/DataBuilderForm.tsx";
import { DataBuilderSelect } from "../inputs/DataBuilderSelect/DataBuilderSelect.tsx";

export type DataBuilderRoute = {
  path: string;
  label: string;
  icon: IconType;
  info: string;
  Page: ComponentType<RouteComponentProps>;
};

export type DataBuilderCategory = {
  label: string;
  routes: DataBuilderRoute[];
};

const alignmentOptions = familiarAlignments.map((alignment) => ({
  value: alignment,
  label: alignment.charAt(0).toUpperCase() + alignment.slice(1),
}));

const categoryOptions = skillCategories.map((category) => ({
  value: category,
  label: category.charAt(0).toUpperCase() + category.slice(1),
}));

const FamiliarsPage = () => {
  return (
    <DataBuilderForm schema={familiarSchema} onSubmit={() => {}} submitLabel="Save familiar">
      <DataBuilderField name="name" label="Name" />
      <DataBuilderField name="id" label="Id" />
      <DataBuilderField name="description" label="Description" />
      <DataBuilderField name="location" label="Location" />
      <DataBuilderSelect name="alignment" label="Alignment" options={alignmentOptions} />
    </DataBuilderForm>
  );
};

const SkillsPage = () => {
  return (
    <DataBuilderForm schema={skillSchema} onSubmit={() => {}} submitLabel="Save skill">
      <DataBuilderField name="name" label="Name" />
      <DataBuilderField name="id" label="Id" />
      <DataBuilderField name="description" label="Description" />
      <DataBuilderSelect name="category" label="Category" options={categoryOptions} />
      <DataBuilderField name="sort_order" label="Sort order" type="numeric" />
    </DataBuilderForm>
  );
};

export const dataBuilderRoutes: DataBuilderCategory[] = [
  {
    label: "Game Data",
    routes: [
      {
        path: "/familiars",
        label: "Familiars",
        icon: GiCat,
        info: "Familiars are collectable pets from different locations that will provide approvements across various locations.",
        Page: FamiliarsPage,
      },
      {
        path: "/skills",
        label: "Skills",
        icon: GiOpenBook,
        info: "Skills are abilities learned through play that change how you act across different parts of the game.",
        Page: SkillsPage,
      },
    ],
  },
  {
    label: "Attributes",
    routes: [],
  },
];
