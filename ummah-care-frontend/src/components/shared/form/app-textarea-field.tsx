"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";

type AppTextareaFieldProps = React.ComponentProps<"textarea"> & {
  label?: string;
  field: AnyFieldApi;
};

export default function AppTextareaField({
  label,
  field,
  className,
  ...props
}: AppTextareaFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        className={cn("min-h-24", className)}
        onChange={(e) => field.handleChange(e.target.value)}
        rows={60}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
