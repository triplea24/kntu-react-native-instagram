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

// url: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};
