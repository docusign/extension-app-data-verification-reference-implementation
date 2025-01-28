import { Router } from 'express';

import Paths from '../constants/paths';
import { verifyBankAccountOwner } from '../services/bankAccountOwnerVerification.service'
import { verifyBankAccount } from '../services/bankAccountVerification.service';
import { verifyEmail } from '../services/emailVerification.service';
import { verifyBusinessFEIN } from '../services/businessFeinVerification.service';
import { verifyPhoneNumber } from '../services/phoneVerification.service';
import { verifySSN } from '../services/ssnVerification.service';
import { verifyPostalAddress, verifyTypeaheadPostalAddress } from '../services/postalAddressVerification.service';
import { expressjwt as jwt } from 'express-jwt';
import { checkSchema } from 'express-validator';
import {
  bankAccountOwnerBody,
  bankAccountBody,
  emailBody,
  businessFEINBody,
  phoneNumberBody,
  ssnBody,
  postalAddressBody
} from '../validationSchemas/dataVerification';
import checkValidationErrors from '../middleware/checkValidationErrors';
import env from '../env';

const dataVerificationRouter = Router();

dataVerificationRouter.post(
  Paths.Verify.BankAccountOwner.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(bankAccountOwnerBody, ['body']),
  checkValidationErrors,
  verifyBankAccountOwner,
);

dataVerificationRouter.post(
  Paths.Verify.BankAccount.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(bankAccountBody, ['body']),
  checkValidationErrors,
  verifyBankAccount,
);

dataVerificationRouter.post(
  Paths.Verify.Email.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(emailBody, ['body']),
  checkValidationErrors,
  verifyEmail,
);

dataVerificationRouter.post(
  Paths.Verify.BusinessFEIN.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(businessFEINBody, ['body']),
  checkValidationErrors,
  verifyBusinessFEIN,
);

dataVerificationRouter.post(
  Paths.Verify.PhoneNumber.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(phoneNumberBody, ['body']),
  checkValidationErrors,
  verifyPhoneNumber,
);

dataVerificationRouter.post(
  Paths.Verify.SSN.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(ssnBody, ['body']),
  checkValidationErrors,
  verifySSN,
);

dataVerificationRouter.post(
  Paths.Verify.PostalAddress.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(postalAddressBody, ['body']),
  checkValidationErrors,
  verifyPostalAddress,
);

dataVerificationRouter.post(
  Paths.Verify.TypeaheadAddress.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(postalAddressBody, ['body']),
  checkValidationErrors,
  verifyTypeaheadPostalAddress,
);
export default dataVerificationRouter;
