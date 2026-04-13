import { IAdminStats } from "@/types";

export const mapPlatformActivityData = (data: IAdminStats) => {
  return (
    data.requestsOverTime.map((item, idx) => {
      const donation = data.donationsOverTime?.[idx];
      const user = data.usersOverTime?.[idx];

      return {
        month: new Date(item.month).toLocaleString("default", {
          month: "short",
        }),
        requests: item.count,
        donations: donation ? Number(donation.amount) : 0,
        users: user ? user.count : 0,
      };
    }) || []
  );
};
