import { USER_TYPE } from "@/constants/user.const";

const { VOLUNTEER, DONOR, ORGANIZATION } = USER_TYPE;

export const onboardRoles = [
  {
    type: VOLUNTEER,
    label: "Volunteer",
    description: "Help communities and people in need.",
  },
  {
    type: DONOR,
    label: "Donor",
    description: "Support causes with donations.",
  },
  {
    type: ORGANIZATION,
    label: "Organization",
    description: "Create campaigns and manage volunteers.",
  },
];
