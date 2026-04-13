import { StatCard } from "@/components/shared/stats/stat-card";
import { StatsGrid } from "@/components/shared/stats/stats-grid";
import { IAdminStats } from "@/types";
import { buildStatsCards } from "./admin-stats-cards.config";

type Props = {
  stats: IAdminStats;
};

export function AdminStatsCards({ stats }: Props) {
  const cards = buildStatsCards(stats);

  return (
    <StatsGrid>
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </StatsGrid>
  );
}
