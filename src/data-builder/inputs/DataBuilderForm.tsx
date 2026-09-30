import { useCallback, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { DataBuilderError } from "./DataBuilderError/DataBuilderError.tsx";
import {
  DataBuilderFormContext,
  type DataBuilderDraftValue,
  type DataBuilderFieldKind,
  type DataBuilderValueUpdater,
} from "./DataBuilderFormContext.tsx";
import styles from "./DataBuilderForm.module.css";

type DataBuilderFormProps<TSchema extends z.ZodType> = {
  schema: TSchema;
  defaultValues?: Record<string, DataBuilderDraftValue>;
  onSubmit: (values: z.output<TSchema>) => void;
  submitLabel?: string;
  children: ReactNode;
};

const completeNumber: Record<"numeric" | "decimal", RegExp> = {
  numeric: /^-?\d+$/,
  decimal: /^-?(?:\d+\.?\d*|\.\d+)$/,
};

const fieldErrorMessage = (
  name: string,
  message: string,
  values: Record<string, DataBuilderDraftValue>,
  fields: Map<string, DataBuilderFieldKind>,
) => {
  const kind = fields.get(name);
  const value = values[name];
  const empty = value == null || value === "" || (Array.isArray(value) && value.length === 0);

  if (empty && (kind === "numeric" || kind === "decimal")) return "Enter a number";
  if (empty && (kind === "single" || kind === "multiple")) return "Select an option";
  if (empty && kind === "text") return "Enter a value";
  return message;
};

const toSchemaValues = (
  values: Record<string, DataBuilderDraftValue>,
  fields: Map<string, DataBuilderFieldKind>,
) => {
  const payload: Record<string, unknown> = { ...values };

  for (const [name, kind] of fields) {
    if (kind !== "numeric" && kind !== "decimal") continue;
    const value = values[name];
    payload[name] = typeof value === "string" && completeNumber[kind].test(value) ? Number(value) : undefined;
  }

  return payload;
};

export const DataBuilderForm = <TSchema extends z.ZodType>({
  schema,
  defaultValues = {},
  onSubmit,
  submitLabel,
  children,
}: DataBuilderFormProps<TSchema>) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const fieldsRef = useRef(new Map<string, DataBuilderFieldKind>());

  const setValue = useCallback((name: string, value: DataBuilderDraftValue | DataBuilderValueUpdater) => {
    setValues((current) => ({
      ...current,
      [name]: typeof value === "function" ? value(current[name]) : value,
    }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setFormError("");
  }, []);

  const registerField = useCallback((name: string, kind: DataBuilderFieldKind) => {
    fieldsRef.current.set(name, kind);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  const contextValue = useMemo(
    () => ({ values, errors, setValue, registerField, unregisterField }),
    [errors, registerField, setValue, unregisterField, values],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(toSchemaValues(values, fieldsRef.current));

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const nextErrors: Record<string, string> = {};
      for (const [name, messages] of Object.entries(flattened.fieldErrors)) {
        if (!Array.isArray(messages)) continue;
        const message = messages.find((item) => typeof item === "string");
        if (!message || nextErrors[name]) continue;
        nextErrors[name] = fieldErrorMessage(name, message, values, fieldsRef.current);
      }
      setErrors(nextErrors);
      setFormError(flattened.formErrors[0] ?? "");
      return;
    }

    setErrors({});
    setFormError("");
    onSubmit(result.data);
  };

  return (
    <DataBuilderFormContext.Provider value={contextValue}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <DataBuilderError>{formError}</DataBuilderError>
        {children}
        {submitLabel ? (
          <button className={styles.submit} type="submit">
            {submitLabel}
          </button>
        ) : null}
      </form>
    </DataBuilderFormContext.Provider>
  );
};
