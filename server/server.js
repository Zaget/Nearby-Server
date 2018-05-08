require('newrelic');
const app = require('./index.js');

app.listen(3004, () => { console.log('Apateez app listening on port 3004!'); });