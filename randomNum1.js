function generateRandomData(userContext, events, done) {
 
  const id = Math.floor(Math.random() * Math.floor(20));
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateRandomData
};