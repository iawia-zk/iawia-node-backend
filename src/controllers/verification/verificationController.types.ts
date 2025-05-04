export type PostVerificationReqBody = {
  runnables: string[];
  // TODO: get this in encrypted format
  passportData: {
    dateOfBirth: string;
    dateOfExpiry: string;
    documentNumber: string;
    issuingCountry: string;
    nationality: string;
  };
};
