import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RequestsFilters() {
  return (
    <div className="flex flex-wrap gap-3 items-center border rounded-lg p-4 bg-muted/30">
      <Select>
        <SelectTrigger size="sm" className="w-35">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="sm" className="w-35">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MEDICAL">Medical</SelectItem>
          <SelectItem value="FINANCIAL">Financial</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="sm" className="w-30">
          <SelectValue placeholder="Urgency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="sm" className="w-35">
          <SelectValue placeholder="Help Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PHYSICAL">Physical</SelectItem>
          <SelectItem value="FINANCIAL">Financial</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" className="ml-auto">
        Reset
      </Button>
    </div>
  );
}
