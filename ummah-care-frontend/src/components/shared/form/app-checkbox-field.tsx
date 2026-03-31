"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

type AppCheckboxFieldProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> & {
  label?: string;
  field: AnyFieldApi;
  description?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
};

export default function AppCheckboxField({
  label,
  field,
  className,
  description,
  orientation,
  ...props
}: AppCheckboxFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field orientation={orientation} data-invalid={isInvalid}>
      <Checkbox
        id={field.name}
        name={field.name}
        aria-invalid={isInvalid}
        checked={!!field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
        className={cn(className)}
        {...props}
      />
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
    </Field>
  );
}
