const { Pool } = require('pg');
const redis = require('redis');
const nr = require('newrelic');

const redisClient = redis.createClient(6379, '13.57.222.179');

const client = new Pool({ database: 'zaget', host: 'zaget.cvjywnma6qrl.us-west-1.rds.amazonaws.com', user: 'dmytromarchenko1998', password: 'Tiger101998!' });

const getData = (req, res) => {
  const placeId = parseInt(req.params.id, 10);
  console.log(checkRedis(placeId));
  if (checkRedis(placeId)) {
    queryRedis(placeId, res);
  } else {
    queryPsql(placeId, res);
  }
}

const checkRedis = (id) => {
  return redisClient.exists(id, function(err, reply) {
    if (reply === 1) {
      return true; 
    } else {
      return false
    }
  });
}

const queryRedis = (id, res) => {
  console.log('redis')
  redisClient.get(id, (err, reply) => {
    data = JSON.parse(reply);
    console.log(data);
    res.send(data);
  })
}

const queryPsql = (id, res) => {
  console.log('psql')
  client.query(`select * from nearby inner join businesses on ${id} = businesses.place_id or nearby.nearby1 = businesses.place_id or nearby.nearby2 = businesses.place_id or nearby.nearby3 = businesses.place_id or nearby.nearby4 = businesses.place_id or nearby.nearby5 = businesses.place_id or nearby.nearby6 = businesses.place_id where nearby.place_id = ${id}`, (err, data) => {
    if (err) {
      res.status(500);
      res.send('not a valid id');
      console.log(err);
    } else {
      const nearby = [];
      let current;
      for (let i = 0; i < 7; i += 1) {
        if (data.rows[i].place_id === id) {
          current = data.rows[i];
        } else {
          nearby.push(data.rows[i]);
        }
      }
      const dataStr = JSON.stringify([current, nearby]);
      addToRedis(id, dataStr);
      res.send([current, nearby]);
    }
  });
}

const addToRedis = (id, data) => {
  redisClient.set(id, data);
}

module.exports = getData;
