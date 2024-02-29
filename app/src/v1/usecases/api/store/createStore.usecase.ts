import { exceptionService } from "../../../core/errors/exceptions";
import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { ICreateStoreInput, IStore } from "../../../domain/store/store";
import createStoreSchema from "../../../presenters/schemas/store/createStore.schema";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";

export type createStoreUseCaseType = (
  payload: ICreateStoreInput
) => Promise<{ store: IStore }>;

export const createStoreUseCaseBase =
  (
    dependencies: {
      storeRepo: IStoreRepository;
    } = {
      storeRepo: storeRepo,
    }
  ): createStoreUseCaseType =>
  async (payload: ICreateStoreInput) => {
    const storeFound = await dependencies.storeRepo.findAll({
      where: [{ storeName: payload.storeName }],
    });
    if (storeFound.length > 0) {
      exceptionService.badRequestException({
        message: "A store With The Given Name Already Exists",
      });
    }

    validatecreateStorePayload(payload);
    const storeCreated = await dependencies.storeRepo.createStore({
      storeName: payload.storeName,
      storePhone: payload.storePhone,
      logo: payload.logo,
      isPublished: payload.isPublished,
      position: payload.position,
      socialMediaLinks: payload.socialMediaLinks,
      vendor_id: payload.vendor_id,
    });

    return {
      store: storeCreated,
    };
  };

export function validatecreateStorePayload(
  payload: ICreateStoreInput
): ICreateStoreInput {
  trimAndValidateSchemaPayload<ICreateStoreInput>(createStoreSchema, payload);
  return payload;
}

export const createStoreUseCase: createStoreUseCaseType =
  createStoreUseCaseBase({
    storeRepo,
  });
