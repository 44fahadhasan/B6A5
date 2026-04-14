import { StatCard } from "@/components/shared/stats/stat-card";
import { StatsGrid } from "@/components/shared/stats/stats-grid";
import { IUserStats } from "@/types";
import { buildUserStatsCards } from "./user-stats-cards.config";

type Props = {
  stats: IUserStats;
};

export function UserStatsCards({ stats }: Props) {
  const cards = buildUserStatsCards(stats);

  return (
    <StatsGrid>
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </StatsGrid>
  );
}
