export const withTimeout = (
  promise,
  timeout = 3000,
  timeoutMessage = "Timeout"
) => {
  const timeoutPriomise = new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error(timeoutMessage)), timeout)
  );
  return Promise.race([timeoutPriomise, promise]);
};
