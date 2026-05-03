import { SingleComboboxItem } from "@/components/shared/form/app-searchable-single-combobox";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";

type CampaignListItemProps = {
  item: SingleComboboxItem;
};

export default function CampaignListItem({ item }: CampaignListItemProps) {
  const { meta: { currency, currentAmount = 0, goalAmount = 0 } = {} } = item;

  const remainingAmount = Math.max(currentAmount, 0);

  const raisedAmount = Math.max(goalAmount - remainingAmount, 0);

  const progressPercentage =
    goalAmount > 0 ? Math.min((raisedAmount / goalAmount) * 100, 100) : 0;

  return (
    <Item size="xs" className="flex flex-col gap-2 p-2">
      <ItemContent className="min-w-0">
        <ItemTitle className="truncate">{item.label}</ItemTitle>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mt-0.5">
          <div className="flex flex-col">
            <span className="uppercase tracking-wide">Goal</span>
            <span className="font-medium text-foreground">
              {goalAmount} {currency}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="uppercase tracking-wide">Remaining</span>
            <span className="font-medium text-foreground">
              {remainingAmount} {currency}
            </span>
          </div>
        </div>
      </ItemContent>

      <Progress value={progressPercentage} className="bg-muted-foreground" />
    </Item>
  );
}
