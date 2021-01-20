const logError = (error: Error) => {
  console.log(error);
};

const logMessage = (message: string) => {
  console.log(message);
};

const logErrorAndMessage = (error: Error, message?: string) => {
  console.log(message, error);
};

export default {
  logError,
  logMessage,
  logErrorAndMessage,
};
