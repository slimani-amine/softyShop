import { IStore } from "../../../domain/store/store";
import {
  IStoreRepository,
  storeRepo,
} from "../../../data/repositories/store.repository";
import { usersRepo } from "../../../data/repositories/users.repository";
import { IUser } from "app/src/v1/domain/users/user";

export type GetVendorStoresUseCaseType = (queryParams: {
  userId: string;
}) => Promise<IStore[]>;

export const getVendorStoresUseCaseBase =
  (dependencies: { storeRepo: IStoreRepository }) =>
  async (queryParams: { userId: string }): Promise<IStore[]> => {
    console.log("🚀 ~ queryParams:", queryParams);

    const vendor = (await usersRepo.findOne({
      where: { id: parseInt(queryParams.userId, 10) },
    })) as any;

    console.log("🚀 ~ vendor:", vendor);

    const storesFound = await dependencies.storeRepo.findMyStores({
      where: { user: vendor },
    });

    return storesFound;
  };

export const getVendorStoresUseCase = getVendorStoresUseCaseBase({
  storeRepo: storeRepo,
});
