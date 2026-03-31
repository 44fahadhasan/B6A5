"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";
import { Select as SelectPrimitive } from "radix-ui";

type Option = {
  label: string;
  value: string;
};

type AppSelectFieldProps = React.ComponentProps<
  typeof SelectPrimitive.Select
> & {
  label?: string;
  field: AnyFieldApi;
  options: Option[];
  className?: string;
  description?: string;
  placeholder?: string;
  size?: "sm" | "default";
  position?: "item-aligned" | "popper";
  orientation?: "vertical" | "horizontal" | "responsive";
};

export default function AppSelectField({
  label,
  field,
  size,
  options,
  position,
  className,
  orientation,
  description,
  placeholder,
  ...props
}: AppSelectFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field orientation={orientation} data-invalid={isInvalid}>
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
        {...props}
      >
        <SelectTrigger
          size={size}
          id={field.name}
          aria-invalid={isInvalid}
          className={cn(className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position={position}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
