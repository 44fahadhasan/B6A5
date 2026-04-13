"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LabelList, Pie, PieChart } from "recharts";

type Props<T> = {
  title: string;
  description?: string;
  data: T[];
  config: ChartConfig;
  dataKey: keyof T & string;
  nameKey: keyof T & string;
};

export function PieChartCard<T>({
  title,
  description,
  data,
  config,
  dataKey,
  nameKey,
}: Props<T>) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={config}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />

            <Pie data={data} dataKey={dataKey} nameKey={nameKey}>
              <LabelList dataKey={nameKey} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
