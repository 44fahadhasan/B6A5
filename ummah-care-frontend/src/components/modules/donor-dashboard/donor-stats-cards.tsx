import { StatCard } from "@/components/shared/stats/stat-card";
import { StatsGrid } from "@/components/shared/stats/stats-grid";
import { IDonorStats } from "@/types";
import { buildDonorStatsCards } from "./donor-stats-cards.config";

type Props = {
  stats: IDonorStats;
};

export function DonorStatsCards({ stats }: Props) {
  const cards = buildDonorStatsCards(stats);

  return (
    <StatsGrid>
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </StatsGrid>
  );
}
