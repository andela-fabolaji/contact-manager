const globalErrorHander = (err, req, res, next) => {
  if (err.name.toLowerCase() === 'validationerror') {
    return res.status(500).send({
      message: err.message,
      error: err.errors
    });
  }

  if (err.name.toLowerCase() === 'duplicatekeyerror') {
    return res.status(500).send({
      message: 'duplicate key error',
      error: err.message,
    });
  }

  if (err.name.toLowerCase() === 'casterror') {
    return res.status(500).send({
      message: 'Invalid object id. Check that the Id sent is correct',
      error: err.message,
    });
  }

  res.status(500).send({
    message: 'Something\'s probably wrong with the server. Kindly try again',
    error: err
  });
}

export default globalErrorHander;