import { StatCard } from "@/components/shared/stats/stat-card";
import { StatsGrid } from "@/components/shared/stats/stats-grid";
import { IVolunteerStats } from "@/types";
import { buildVolunteerStatsCards } from "./volunteer-stats-cards.config";

type Props = {
  stats: IVolunteerStats;
};

export function VolunteerStatsCards({ stats }: Props) {
  const cards = buildVolunteerStatsCards(stats);

  return (
    <StatsGrid>
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </StatsGrid>
  );
}
