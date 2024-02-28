import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import getV1AuthRouter from 'app/src/v1/presenters/routes/auth';
import { loginControllerBase } from 'app/src/v1/presenters/controllers/auth/login.controller';
import { loginUseCaseBase } from 'app/src/v1/usecases/auth/login.usecase';
import { usersRepoBase } from 'app/src/v1/data/repositories/users.repository';
import { createUserTokensUseCase } from 'app/src/v1/usecases/auth/createUserTokens.usecase';
import { logoutControllerBase } from 'app/src/v1/presenters/controllers/auth/logout.controller';
import { registerControllerBase } from 'app/src/v1/presenters/controllers/auth/register.controller';
import { registerUseCaseBase } from 'app/src/v1/usecases/auth/register.usecase';
import {
  generateAndSendUserAccountVerificationEmail,
  requestAccountVerificationUseCaseBase,
} from 'app/src/v1/usecases/auth/requestAccountVerification.usecase';
import { passwordResetControllerBase } from 'app/src/v1/presenters/controllers/auth/passwordReset.controller';
import { passwordResetUseCaseBase } from 'app/src/v1/usecases/auth/passwordReset.usecase';
import { userPasswordResetInformationRepositoryBase } from 'app/src/v1/data/repositories/userPasswordResetInformation.repository';
import { refreshTokensControllerBase } from 'app/src/v1/presenters/controllers/auth/refreshTokens.controller';
import { refreshUserTokensUseCaseBase } from 'app/src/v1/usecases/auth/refreshTokens.usecase';
import { requestPasswordResetControllerBase } from 'app/src/v1/presenters/controllers/auth/requestPasswordReset.controller';
import { requestPasswordResetUseCaseBase } from 'app/src/v1/usecases/auth/requestPasswordReset.usecase';
import { sendUserVerificationMailUseCase } from 'app/src/v1/usecases/api/mailing/sendVerificationMail.usecase';
import { requestAccountVerificationControllerBase } from 'app/src/v1/presenters/controllers/auth/requestAccountVerification.controller';
import { verifyAccountControllerBase } from 'app/src/v1/presenters/controllers/auth/verifyAccount.controller';
import { verifyAccountUseCaseBase } from 'app/src/v1/usecases/auth/verifyAccount.usecase';
import { requestInterceptor } from 'app/src/v1/presenters/middlewares/interceptors/request.interceptor';
import { responseInterceptor } from 'app/src/v1/presenters/middlewares/interceptors/response.interceptor';
import { handleErrorMiddleware } from 'app/src/v1/presenters/middlewares/errors/handleError.middleware';
import { IUser } from 'app/src/v1/domain/users/user';
import { makeTransactionalController } from 'app/src/v1/presenters/middlewares/controllers/transactional.controller';
import { DataSource } from 'typeorm';

export function createTestApp(testDataSource: DataSource) {
  const server = express();
  const allowedOrigins = ['https://www.dev.tresovista.laxmi.cloud', 'http://localhost:3000'];
  server.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  server.use(express.json());
  server.use(cookieParser());
  server.use(requestInterceptor);
  server.use(responseInterceptor);
  server.use(
    '/v1/auth',
    getV1AuthRouter({
      loginController: loginControllerBase(
        loginUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
          createUserTokensUseCase: createUserTokensUseCase,
        }),
      ),
      logoutController: logoutControllerBase(),
      registerController: makeTransactionalController(testDataSource)((tx) =>
        registerControllerBase(
          registerUseCaseBase({
            usersRepo: usersRepoBase(tx),
            createUserTokensUseCase: createUserTokensUseCase,
            generateAndSendUserAccountVerificationEmail: async (user: IUser) => {
              console.log(`GENERATE AND SEND FOR USER ${user}`);
              return '';
            },
          }),
        ),
      ),
      passwordResetController: passwordResetControllerBase(
        passwordResetUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
          userPasswordResetInformationsRepo:
            userPasswordResetInformationRepositoryBase(testDataSource),
        }),
      ),
      refreshTokensController: refreshTokensControllerBase(
        refreshUserTokensUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
        }),
      ),
      requestPasswordResetController: requestPasswordResetControllerBase(
        requestPasswordResetUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
          sendUserPasswordResetMailUseCase: sendUserVerificationMailUseCase,
          userPasswordResetInformationsRepo:
            userPasswordResetInformationRepositoryBase(testDataSource),
        }),
      ),
      requestUserAccountVerificationController: requestAccountVerificationControllerBase(
        requestAccountVerificationUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
          generateAndSendUserAccountVerificationEmail: generateAndSendUserAccountVerificationEmail,
        }),
      ),
      verifyAccountController: verifyAccountControllerBase(
        verifyAccountUseCaseBase({
          usersRepo: usersRepoBase(testDataSource),
          createUserTokensUseCase: createUserTokensUseCase,
        }),
      ),
    }),
  );

  server.use(handleErrorMiddleware);
  return server;
}
