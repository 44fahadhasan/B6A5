import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getIconCom = (iconName?: string): LucideIcon => {
  if (!iconName) return Icons.HelpCircle;

  const Icon = Icons[iconName as keyof typeof Icons];
  return (Icon || Icons.HelpCircle) as LucideIcon;
};
