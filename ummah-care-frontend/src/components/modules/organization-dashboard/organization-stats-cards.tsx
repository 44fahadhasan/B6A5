import { StatCard } from "@/components/shared/stats/stat-card";
import { StatsGrid } from "@/components/shared/stats/stats-grid";
import { IOrganizationStats } from "@/types";
import { buildOrganizationStatsCards } from "./organization-stats-cards.config";

type Props = {
  stats: IOrganizationStats;
};

export function OrganizationStatsCards({ stats }: Props) {
  const cards = buildOrganizationStatsCards(stats);

  return (
    <StatsGrid>
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </StatsGrid>
  );
}
