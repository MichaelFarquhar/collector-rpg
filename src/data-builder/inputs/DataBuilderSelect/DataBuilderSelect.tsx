import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { DataBuilderError } from "../DataBuilderError/DataBuilderError.tsx";
import { useDataBuilderControl } from "../DataBuilderFormContext.tsx";
import { DataBuilderLabel } from "../DataBuilderLabel/DataBuilderLabel.tsx";
import controlStyles from "../inputControl.module.css";
import styles from "./DataBuilderSelect.module.css";

export type DataBuilderSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DataBuilderSelectProps = {
  name: string;
  label: string;
  options: DataBuilderSelectOption[];
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

export const DataBuilderSelect = ({
  name,
  label,
  options,
  multiple = false,
  placeholder = "Select",
  disabled = false,
}: DataBuilderSelectProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { value, error, setValue } = useDataBuilderControl(name, multiple ? "multiple" : "single");

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : [];
  const selectedValue = multiple ? "" : typeof value === "string" ? value : "";
  const selectedLabels = options
    .filter((option) => (multiple ? selectedValues.includes(option.value) : option.value === selectedValue))
    .map((option) => option.label);
  const displayValue = selectedLabels.join(", ");

  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const isSelected = (optionValue: string) => {
    if (multiple) return selectedValues.includes(optionValue);
    return optionValue === selectedValue;
  };

  const commit = (optionValue: string) => {
    if (multiple) {
      setValue((current) => {
        const selected = Array.isArray(current) ? current : [];
        return selected.includes(optionValue)
          ? selected.filter((item) => item !== optionValue)
          : [...selected, optionValue];
      });
      return;
    }

    setValue(optionValue);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    return () => document.removeEventListener("pointerdown", closeOnPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listboxId}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listboxId, open]);

  const moveActive = (direction: 1 | -1) => {
    if (options.length === 0) return;
    setActiveIndex((index) => (index + direction + options.length) % options.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        const selectedIndex = options.findIndex((option) => isSelected(option.value));
        setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
        setOpen(true);
        return;
      }
      moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option && !option.disabled) commit(option.value);
      return;
    }

    if (event.key === "Escape" || event.key === "Tab") setOpen(false);
  };

  return (
    <div className={controlStyles.group} data-invalid={error ? true : undefined} ref={rootRef}>
      <DataBuilderLabel htmlFor={id} id={labelId}>
        {label}
      </DataBuilderLabel>
      <div className={styles.wrap}>
        <button
          className={styles.trigger}
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open ? optionId(activeIndex) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={handleKeyDown}
        >
          <span className={displayValue ? styles.value : styles.placeholder}>{displayValue || placeholder}</span>
          <span className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron} aria-hidden="true" />
        </button>
        {open ? (
          <ul
            className={styles.menu}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            aria-multiselectable={multiple || undefined}
          >
            {options.map((option, index) => {
              const selected = isSelected(option.value);

              return (
                <li key={option.value}>
                  <button
                    className={index === activeIndex ? `${styles.option} ${styles.optionActive}` : styles.option}
                    id={optionId(index)}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={option.disabled}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      if (!option.disabled) commit(option.value);
                    }}
                  >
                    <span>{option.label}</span>
                    {selected ? (
                      <span className={styles.mark} aria-hidden="true">
                        ✓
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <DataBuilderError id={errorId}>{error}</DataBuilderError>
    </div>
  );
};
