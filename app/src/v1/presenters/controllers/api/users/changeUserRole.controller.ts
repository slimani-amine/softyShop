import { logger } from "../../../../core/logger/logger";
import {
  ChangeUserRoleUseCaseType,
  changeUserRoleUseCase,
} from "../../../../usecases/api/users/changeUserRole.usecase";
import { NextFunction, Request, Response } from "express";

export const changeUserRoleControllerBase =
  (changeUserRoleUseCase: ChangeUserRoleUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    if (!userId) return;

    try {
      logger.log("CHANGE USER ROLE", `UPDATE USER ${userId}`);

      const result = await changeUserRoleUseCase(userId, req?.body);

      res.status(201).send({
        message: "Your profile has been successfully updated",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const changeUserRoleController = changeUserRoleControllerBase(
  changeUserRoleUseCase
);
