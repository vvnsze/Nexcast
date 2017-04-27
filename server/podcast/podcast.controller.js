exports.searchItunes = (req, res) => {
  console.log('podcast controller searchItunes: ', req.query);
  res.send({ cheese: 'cheese' });
};
