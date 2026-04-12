import { HELP_TYPE } from "@/constants/request.const";
import { RESPONSE_TYPE } from "@/constants/response.const";
import { USER_TYPE, USER_TYPE_STATUS } from "@/constants/user.const";
import { capitalize } from "@/lib/utils";
import { IUserTypeEntries, THelpType, TResponseType } from "@/types";

export type TOption = {
  value: string;
  label: string;
};

export const getResponseTypeOptions = (
  userTypes: IUserTypeEntries[],
  helpType: THelpType,
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

      return responseType;
    })
    .filter((responseType) => {
      if (helpType === HELP_TYPE.PHYSICAL) {
        return responseType === RESPONSE_TYPE.VOLUNTEER;
      }

      if (helpType === HELP_TYPE.FINANCIAL) {
        return responseType === RESPONSE_TYPE.DONATE;
      }

      if (helpType === HELP_TYPE.BOTH) {
        return (
          responseType === RESPONSE_TYPE.VOLUNTEER ||
          responseType === RESPONSE_TYPE.DONATE
        );
      }

      return true;
    })
    .map((responseType) => ({
      value: responseType,
      label: capitalize(responseType),
    }));
