function generateRandomData(userContext, events, done) {
 
  const id = Math.floor(Math.random() * Math.floor(9999999));
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateRandomData
};