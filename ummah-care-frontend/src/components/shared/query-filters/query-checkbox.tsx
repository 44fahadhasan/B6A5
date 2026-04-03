"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";

type QueryCheckboxParams = {
  id: string;
  label: string;
  value: string;
  paramName: string;
  className?: string;
  checkboxClassName?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
};

export default function QueryCheckbox({
  id,
  label,
  value,
  paramName,
  className,
  checkboxClassName,
  orientation = "horizontal",
}: QueryCheckboxParams) {
  const { paramValue, setParamValue } = useQueryParam(paramName);

  const toggle = (isChecked: boolean) => setParamValue(isChecked ? value : "");

  return (
    <Field orientation={orientation} className={cn(className)}>
      <Checkbox
        id={id}
        checked={paramValue === value}
        className={cn(checkboxClassName)}
        onCheckedChange={(v) => toggle(v === true)}
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  );
}
