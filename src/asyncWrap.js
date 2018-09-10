const asyncWrap = handlerFn => {
  return (req, res, next) => {
    return Promise.resolve(handlerFn(req, res, next)).catch(next)
  }
};

export default asyncWrap;