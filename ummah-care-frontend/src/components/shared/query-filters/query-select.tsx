"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { Select as SelectPrimitive } from "radix-ui";

type Option = {
  label: string;
  value: string;
};

type QuerySelectProps = React.ComponentProps<typeof SelectPrimitive.Select> & {
  paramName: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

export default function QuerySelect({
  paramName,
  options,
  placeholder = "Select...",
  className,
  triggerClassName,
  ...props
}: QuerySelectProps) {
  const { paramValue, setParamValue } = useQueryParam(paramName);

  return (
    <Select
      value={paramValue}
      onValueChange={(v) => setParamValue(v)}
      {...props}
    >
      <SelectTrigger size="sm" className={cn(triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(className)}>
        {options.map((opt, idx) => (
          <SelectItem key={idx} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
