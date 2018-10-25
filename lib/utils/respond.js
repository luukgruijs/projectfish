module.exports = response => {
  return { statusCode: 200, body: JSON.stringify(response) };
};
