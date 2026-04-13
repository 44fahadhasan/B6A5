"use server";

import { httpClient } from "@/lib/http-client";
import { IStatsResponse } from "@/types";
import { safeRequest } from "@/utils/safe-request";

export const getDashboardStats = async () =>
  safeRequest(async () => {
    const response = await httpClient.get<IStatsResponse>("/stats");
    return response;
  });
