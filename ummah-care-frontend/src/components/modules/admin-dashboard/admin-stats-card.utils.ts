import { REQUEST_STATUS, URGENCY } from "@/constants/request.const";
import { USER_TYPE } from "@/constants/user.const";
import { IAdminStats } from "@/types";

export const getOpenRequests = (stats: IAdminStats) =>
  stats.requestStatusDistribution.find((s) => s.status === REQUEST_STATUS.OPEN)
    ?._count.id ?? 0;

export const getCriticalRequests = (stats: IAdminStats) =>
  stats.requestUrgencyDistribution.find((u) => u.urgency === URGENCY.CRITICAL)
    ?._count.id ?? 0;

export const getDonorCount = (stats: IAdminStats) =>
  stats.userTypeCounts?.find((u) => u.type === USER_TYPE.DONOR)?._count.id ?? 0;
