import { RESPONSE_TYPE } from "@/constants/response.const";
import { USER_TYPE, USER_TYPE_STATUS } from "@/constants/user.const";
import { capitalize } from "@/lib/utils";
import { IUserTypeEntries, TResponseType } from "@/types";

type TOption = {
  value: string;
  label: string;
};

export const getResponseTypeOptions = (
  userTypes: IUserTypeEntries[],
): TOption[] =>
  userTypes
    .filter((item) => item.status === USER_TYPE_STATUS.ACTIVE)
    .map((item) => {
      const responseType: TResponseType =
        item.type === USER_TYPE.ORGANIZATION
          ? RESPONSE_TYPE.COORDINATE
          : item.type === USER_TYPE.DONOR
            ? RESPONSE_TYPE.DONATE
            : item.type;

      return {
        value: responseType,
        label: capitalize(responseType),
      };
    });
