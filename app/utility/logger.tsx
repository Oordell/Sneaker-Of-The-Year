const logError = (error: Error) => {
  console.log(error);
};

const logMessage = (message: String) => {
  console.log(message);
};

const logErrorAndMessage = (error: Error, message?: String) => {
  console.log(message, error);
};

export default {
  logError,
  logMessage,
  logErrorAndMessage,
};
