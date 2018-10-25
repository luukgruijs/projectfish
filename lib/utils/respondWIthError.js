module.exports = (
  statusCode = 500,
  msg = "Something unexpected went wrong"
) => {
  return {
    statusCode,
    body: JSON.stringify({ msg })
  };
};
