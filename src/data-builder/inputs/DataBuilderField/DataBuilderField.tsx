import { useId, type ChangeEvent } from "react";
import { DataBuilderError } from "../DataBuilderError/DataBuilderError.tsx";
import { useDataBuilderControl, type DataBuilderFieldKind } from "../DataBuilderFormContext.tsx";
import { DataBuilderLabel } from "../DataBuilderLabel/DataBuilderLabel.tsx";
import controlStyles from "../inputControl.module.css";
import styles from "./DataBuilderField.module.css";

export type DataBuilderFieldType = "text" | "numeric" | "decimal";

type DataBuilderFieldProps = {
  name: string;
  label: string;
  type?: DataBuilderFieldType;
  placeholder?: string;
  disabled?: boolean;
};

const inputPatterns: Record<Exclude<DataBuilderFieldType, "text">, RegExp> = {
  numeric: /^-?\d*$/,
  decimal: /^-?\d*\.?\d*$/,
};

const inputModes: Record<DataBuilderFieldType, "text" | "numeric" | "decimal"> = {
  text: "text",
  numeric: "numeric",
  decimal: "decimal",
};

export const DataBuilderField = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
}: DataBuilderFieldProps) => {
  const id = useId();
  const errorId = `${id}-error`;
  const kind: DataBuilderFieldKind = type;
  const { value, error, setValue } = useDataBuilderControl(name, kind);
  const textValue = typeof value === "string" ? value : "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    if (type !== "text" && !inputPatterns[type].test(nextValue)) return;
    setValue(nextValue);
  };

  return (
    <div className={controlStyles.group} data-invalid={error ? true : undefined}>
      <DataBuilderLabel htmlFor={id}>{label}</DataBuilderLabel>
      <input
        className={styles.input}
        id={id}
        name={name}
        type="text"
        inputMode={inputModes[type]}
        autoComplete="off"
        value={textValue}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={handleChange}
      />
      <DataBuilderError id={errorId}>{error}</DataBuilderError>
    </div>
  );
};
