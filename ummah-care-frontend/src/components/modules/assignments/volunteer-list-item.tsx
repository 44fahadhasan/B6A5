import { SingleComboboxItem } from "@/components/shared/form/app-searchable-single-combobox";
import { TypographyMuted } from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

type VolunteerListItemProps = {
  item: SingleComboboxItem;
};

export default function VolunteerListItem({ item }: VolunteerListItemProps) {
  return (
    <Item size="xs" className="flex items-center gap-3 p-1">
      <Avatar>
        <AvatarImage alt={item.label} src={item.meta?.avatarUrl} />
        <AvatarFallback>{item.label.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <ItemContent className="min-w-0">
        <ItemTitle className="truncate">{item.label}</ItemTitle>
        <TypographyMuted>{item.meta?.email}</TypographyMuted>
      </ItemContent>
    </Item>
  );
}
