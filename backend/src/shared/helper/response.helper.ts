const responseOk = (message: string, data?: any) => {
  return {
    result: true,
    message,
    data,
  };
};

const responseError = (message: string, data?: any) => {
  return {
    result: false,
    message,
    data,
  };
};

export { responseOk, responseError };
