import { createContext, useCallback, useContext, useEffect } from "react";

export type DataBuilderFieldKind = "text" | "numeric" | "decimal" | "single" | "multiple";

export type DataBuilderDraftValue = string | string[];

export type DataBuilderValueUpdater = (
  current: DataBuilderDraftValue | undefined,
) => DataBuilderDraftValue;

type DataBuilderFormContextValue = {
  values: Record<string, DataBuilderDraftValue>;
  errors: Record<string, string>;
  setValue: (name: string, value: DataBuilderDraftValue | DataBuilderValueUpdater) => void;
  registerField: (name: string, kind: DataBuilderFieldKind) => void;
  unregisterField: (name: string) => void;
};

export const DataBuilderFormContext = createContext<DataBuilderFormContextValue | null>(null);

export const useDataBuilderForm = () => {
  const context = useContext(DataBuilderFormContext);
  if (!context) {
    throw new Error("Data builder inputs must be rendered inside DataBuilderForm.");
  }
  return context;
};

export const useDataBuilderControl = (name: string, kind: DataBuilderFieldKind) => {
  const { values, errors, setValue, registerField, unregisterField } = useDataBuilderForm();

  useEffect(() => {
    registerField(name, kind);
    return () => unregisterField(name);
  }, [kind, name, registerField, unregisterField]);

  const setControlValue = useCallback(
    (value: DataBuilderDraftValue | DataBuilderValueUpdater) => {
      setValue(name, value);
    },
    [name, setValue],
  );

  return {
    value: values[name],
    error: errors[name],
    setValue: setControlValue,
  };
};
