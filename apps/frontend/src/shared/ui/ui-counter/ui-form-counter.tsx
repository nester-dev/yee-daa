import type { ReactNode } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import UiCounter from "./ui-counter.tsx";

type FormCounterProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  min?: number;
  max?: number;
  rules?: object;
  className?: string;
  label?: ReactNode;
};

export function FormCounter<T extends FieldValues>({
  name,
  control,
  min = 1,
  max = 999,
  rules,
  className,
  label,
}: FormCounterProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const intValue = parseInt(value);
        return (
          <UiCounter
            className={className}
            label={label}
            value={intValue ?? min}
            increment={() => onChange(Math.min(max, (intValue ?? min) + 1))}
            decrement={() => onChange(Math.max(min, (intValue ?? min) - 1))}
            error={!!error?.message}
          />
        );
      }}
    />
  );
}
