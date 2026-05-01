import { TAssignmentStatus } from "./assignment.type";
import { TCampaignStatus } from "./campaign.type";
import { TDonationStatus } from "./donate.type";
import { TCategory, TRequestStatus, TUrgency } from "./request.type";
import { TResponseType } from "./response.types";
import { TUserType } from "./user-type";

export interface IStatsResponse {
  userStats?: IUserStats;
  adminStats?: IAdminStats;
  organizationStats?: IOrganizationStats;
  volunteerStats?: IVolunteerStats;
  donorStats?: IDonorStats;
}

export interface IAdminStats {
  userCount: number;
  requestCount: number;
  donationCount: number;
  campaignCount: number;
  organizationCount: number;
  assignmentCount: number;
  responseCount: number;
  messageCount: number;
  reviewCount: number;
  reportCount: number;
  notificationCount: number;
  verifiedOrgCount: number;
  totalDonationAmount: number;
  userTypeCounts: Array<{
    type: TUserType;
    _count: {
      id: number;
    };
  }>;
  requestStatusDistribution: Array<{
    status: TRequestStatus;
    _count: {
      id: number;
    };
  }>;
  donationStatusDistribution: Array<{
    status: TDonationStatus;
    _count: {
      id: number;
    };
  }>;
  campaignStatusDistribution: Array<{
    status: TCampaignStatus;
    _count: {
      id: number;
    };
  }>;
  requestCategoryDistribution: Array<{
    category: TCategory;
    _count: {
      id: number;
    };
  }>;
  requestUrgencyDistribution: Array<{
    urgency: TUrgency;
    _count: {
      id: number;
    };
  }>;
  responseTypeDistribution: Array<{
    responseType: TResponseType;
    _count: {
      id: number;
    };
  }>;
  assignmentStatusDistribution: Array<{
    status: TAssignmentStatus;
    _count: {
      id: number;
    };
  }>;
  donationsOverTime: Array<{
    month: Date;
    count: number;
    amount: string;
  }>;
  requestsOverTime: Array<{
    month: Date;
    count: number;
  }>;
  usersOverTime: Array<{
    month: Date;
    count: number;
  }>;
}

export interface IOrganizationStats {
  campaignCount: number;
  activeCampaignCount: number;
  completedCampaignCount: number;
  totalRaised: number;
  goalAmount: number;
  assignmentCount: number;
  completedAssignmentCount: number;
  donationCount: number;
  totalDonationAmount: number;
  campaignPerformance: Array<{
    id: string;
    title: string;
    goalAmount: number;
    currentAmount: number;
    status: TCampaignStatus;
    createdAt: string;
  }>;
  recentDonations: Array<{
    id: string;
    amount: number;
    status: TDonationStatus;
    createdAt: string;
    donor: {
      name: string;
      email: string;
    };
    request: {
      title: string;
    };
  }>;
}

export interface IVolunteerStats {
  assignmentCount: number;
  completedAssignmentCount: number;
  inProgressAssignmentCount: number;
  responseCount: number;
  reviewCount: number;
  averageRating: number;
  recentAssignments: Array<{
    id: string;
    status: TAssignmentStatus;
    assignedAt: string;
    completedAt?: string;
    request: {
      title: string;
      category: TCategory;
      urgency: TUrgency;
    };
  }>;
  assignmentStatusDistribution: Array<{
    status: TAssignmentStatus;
    _count: {
      id: number;
    };
  }>;
}

export interface IDonorStats {
  donationCount: number;
  totalDonated: number;
  responseCount: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    status: TDonationStatus;
    createdAt: string;
    request: {
      title: string;
      category: TCategory;
    };
    campaign?: {
      title: string;
    };
  }>;
  donationStatusDistribution: Array<{
    status: TDonationStatus;
    _count: {
      id: number;
    };
  }>;
  categoryStats: Record<
    TCategory,
    {
      count: number;
      amount: number;
    }
  >;
}

export interface IUserStats {
  requestCount: number;
  activeRequestCount: number;
  completedRequestCount: number;
  receivedDonationCount: number;
  totalReceivedAmount: number;
  recentRequests: Array<{
    id: string;
    title: string;
    category: TCategory;
    urgency: TUrgency;
    status: TRequestStatus;
    createdAt: string;
  }>;
  recentReceivedDonations: Array<{
    id: string;
    amount: number;
    status: TDonationStatus;
    createdAt: string;
    donor: {
      name: string;
      email: string;
    };
    request: {
      title: string;
    };
  }>;
  requestStatusDistribution: Array<{
    status: TRequestStatus;
    _count: {
      id: number;
    };
  }>;
}
