import {
  IAddress,
  ICreateAddressInput,
} from "../../../domain/addresses/addresses";
import { exceptionService } from "../../../core/errors/exceptions";

import createAddressSchema from "../../../presenters/schemas/address/createAddress.schema";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import {
  IAddressRepository,
  addressRepo,
} from "../../../data/repositories/addresses.repository";
import { usersRepo } from "../../../data/repositories/users.repository";
import { ACCOUNT_NOT_FOUND_ERROR_MESSAGE } from "../../../domain/auth/errors";

export type createAddressUseCaseType = (
  payload: ICreateAddressInput
) => Promise<{ address: IAddress }>;

export const createAddressUseCaseBase =
  (
    dependencies: {
      addressRepo: IAddressRepository;
    } = {
      addressRepo: addressRepo,
    }
  ): createAddressUseCaseType =>
  async (payload: ICreateAddressInput) => {
    const user = await usersRepo.findOne({ where: { id: payload.user_id } });
    if (!user) {
      exceptionService.notFoundException({
        message: ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
      });
    }

    const addressFound = await dependencies.addressRepo.findAll({
      where: [{ address: payload.address, user: { id: payload.user_id } }],
    });

    if (addressFound.length > 0) {
      exceptionService.badRequestException({
        message: "An address already exist for this user.",
      });
    }

    validateCreateAddressPayload(payload);
    const addressCreated = await dependencies.addressRepo.createAddress({
      address: payload.address,
      phoneNumber: payload?.phoneNumber || user.phoneNumber,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      user_id: payload.user_id,
    });

    return {
      address: addressCreated,
    };
  };

export function validateCreateAddressPayload(
  payload: ICreateAddressInput
): ICreateAddressInput {
  trimAndValidateSchemaPayload<ICreateAddressInput>(
    createAddressSchema,
    payload
  );
  return payload;
}

export const createAddressUseCase: createAddressUseCaseType =
  createAddressUseCaseBase({
    addressRepo,
  });
