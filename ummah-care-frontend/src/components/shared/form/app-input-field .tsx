"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";

type AppInputFieldProps = React.ComponentProps<"input"> & {
  label?: string;
  field: AnyFieldApi;
  prepend?: React.ReactNode;
  prependClassName?: string;
  append?: React.ReactNode;
  appendClassName?: string;
};

export default function AppInputField({
  label,
  field,
  type = "text",
  className,
  prepend,
  prependClassName,
  append,
  appendClassName,
  ...props
}: AppInputFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <div className="relative w-full">
        {prepend && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-3 z-10",
              prependClassName,
            )}
          >
            {prepend}
          </div>
        )}
        <Input
          type={type}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
          className={cn(prepend && "pl-10", append && "pr-10", className)}
          onChange={(e) => field.handleChange(e.target.value)}
          {...props}
        />
        {append && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3 z-10",
              appendClassName,
            )}
          >
            {append}
          </div>
        )}
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
