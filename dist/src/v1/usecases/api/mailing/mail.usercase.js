"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailUserUseCaseBuilder = exports.mailUserUseCaseBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const config_1 = require("../../../../config");
const exceptions_1 = require("../../../core/errors/exceptions");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const errors_1 = require("../../../domain/mailing/errors");
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true' ? true : false,
    auth: {
        user: config_1.MAILING_CONFIG.EMAIL,
        pass: config_1.MAILING_CONFIG.PWD,
    },
    tls: { rejectUnauthorized: false },
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve(__dirname, './views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, './views/'),
};
transporter.use('compile', hbs(handlebarOptions));
const mailUserUseCaseBase = () => (payload) => async (user, context) => {
    try {
        const email = config_1.ENVIRONMENT === 'production'
            ? user.email
            : config_1.MAILING_CONFIG.TEST_EMAIL_RECEIVER === 'ACTUAL_EMAIL'
                ? user.email
                : config_1.MAILING_CONFIG.TEST_EMAIL_RECEIVER;
        await transporter.sendMail({
            from: config_1.MAILING_CONFIG.SENDER,
            to: email,
            subject: payload.subject,
            template: payload.template,
            context: context,
        });
        return true;
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error) {
            logger_1.logger.error('MAILING', err.message);
        }
        exceptions_1.exceptionService.internalException({
            message: errors_1.UNKNOWN_MAILING_ERROR_MESSAGE,
        });
    }
};
exports.mailUserUseCaseBase = mailUserUseCaseBase;
exports.mailUserUseCaseBuilder = (0, exports.mailUserUseCaseBase)();
//# sourceMappingURL=mail.usercase.js.map