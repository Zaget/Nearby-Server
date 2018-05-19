const { Pool } = require('pg');
const redis = require('redis');

const pool = new Pool({
  database: 'zaget', host: 'zaget.cvjywnma6qrl.us-west-1.rds.amazonaws.com', user: 'dmytromarchenko1998', password: 'Tiger101998!',
});

const redisClient = redis.createClient(6379, '13.57.222.179');

const checkRedis = (req, res) => {
  const placeId = parseInt(req.params.id, 10);
  redisClient.get(req.params.id, (err, reply) => {
    if (reply === null) {
      psqlQuery(placeId, res);
    } else {
      const data = JSON.parse(reply);
      res.send(data);
    }
  });
};

const psqlQuery = (placeId, res) => {
  pool.connect((err, client, release) => {
    client.query(`select * from nearby inner join businesses on ${placeId} = businesses.place_id or nearby.nearby1 = businesses.place_id or nearby.nearby2 = businesses.place_id or nearby.nearby3 = businesses.place_id or nearby.nearby4 = businesses.place_id or nearby.nearby5 = businesses.place_id or nearby.nearby6 = businesses.place_id where nearby.place_id = ${placeId}`, (err, data) => {
      release();
      if (err) {
        res.status(500);
        res.send('not a valid id');
        console.log(err);
      } else {
        var response = formatResponse(placeId, data);
        addRedis(placeId, response);
        res.send(response);
      }
    });
  });
};

const formatResponse = (placeId, data) => {
  const nearby = [];
  let current;
  for (let i = 0; i < 7; i += 1) {
    if (data.rows[i].place_id === placeId) {
      current = data.rows[i];
    } else {
      nearby.push(data.rows[i]);
    }
  }
  return [current, nearby];
}

const addRedis = (placeId, data) => {
  const idStr = JSON.stringify(placeId);
  const dataStr = JSON.stringify([current, nearby]);
  redisClient.set(idStr, dataStr);
}

module.exports = checkRedis;
