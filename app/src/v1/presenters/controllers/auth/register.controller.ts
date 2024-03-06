import {
  RegisterUseCase,
  registerUseCase,
  registerUseCaseBase,
} from "../../../usecases/auth/register.usecase";
import { Request, Response } from "express";
import { transactionalController } from "../../middlewares/controllers/transactional.controller";
import { usersRepoBase } from "../../../data/repositories/users.repository";
import { generateAndSendUserAccountVerificationEmail } from "../../../usecases/auth/requestAccountVerification.usecase";
import { createUserTokensUseCase } from "../../../usecases/auth/createUserTokens.usecase";
import { TOKENS_INFO } from "../../../../config";

const registerControllerBase =
  (registerUserCase: RegisterUseCase) =>
  async (req: Request, res: Response) => {
    const result = await registerUserCase(req?.body);
    res.cookie(TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME, result.refreshToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      maxAge: TOKENS_INFO.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
    });
    res.cookie(TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME, result.accessToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      maxAge: TOKENS_INFO.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS,
    });
    return res.status(201).json({
      message: "successfully registered",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  };

const registerController = registerControllerBase(registerUseCase);
export { registerControllerBase, registerController };

export const transactionalRegisterController = transactionalController((tx) => {
  const transactionalUsersRepo = usersRepoBase(tx);
  return registerControllerBase(
    registerUseCaseBase({
      createUserTokensUseCase: createUserTokensUseCase,
      usersRepo: transactionalUsersRepo,
      generateAndSendUserAccountVerificationEmail:
        generateAndSendUserAccountVerificationEmail,
    })
  );
});
