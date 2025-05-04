export type PostVerificationReqBody = {
  runnables: string[];
  // TODO: get this in encrypted format
  passportData: TTransactionDataEncrypted;
};

export type TTransactionDataEncrypted = {
  dateOfBirth: TEncrypted;
  dateOfExpiry: TEncrypted;
  documentNumber: TEncrypted;
  issuingCountry: TEncrypted;
  nationality: TEncrypted;
};

export type TEncrypted = {
  cipher: string;
  iv: string;
};
