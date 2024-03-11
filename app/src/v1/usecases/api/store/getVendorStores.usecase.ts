import { IStore } from "../../../domain/store/store";
import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { usersRepo } from "../../../data/repositories/users.repository";

export type GetVendorStoresUseCaseType = (queryParams: {
  userId: string;
}) => Promise<IStore[]>;

export const getVendorStoresUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) =>
  async (queryParams: { userId: string }): Promise<IStore[]> => {
    const vendor = (await usersRepo.findOne({
      where: { id: queryParams.userId },
    })) as any;

    const storesFound = await dependencies.storeRepo.findAll({
      where: { user: vendor },
    });

    return storesFound;
  };

export const getVendorStoresUseCase = getVendorStoresUseCaseBase({
  storeRepo: storeRepo,
});
