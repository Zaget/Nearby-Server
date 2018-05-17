const { Pool } = require('pg');
const redis = require('redis');
const nr = require('newrelic');

const redisClient = redis.createClient(6379, '13.57.222.179');

const client = new Pool({ database: 'zaget', host: 'zaget.cvjywnma6qrl.us-west-1.rds.amazonaws.com', user: 'dmytromarchenko1998', password: 'Tiger101998!' });

const checkRedis = (req, res) => {
  const placeId = parseInt(req.params.id, 10);
  redisClient.get(placeId, (err, reply) => {
    if ((reply !== undefined) && (reply !== null)) {
      data = JSON.parse(reply);
      res.send(data);
    } else {
      queryPsql(placeId, res);
    }
  })
}

const addToRedis = (id, data) => {
  nr.startSegment('addToRedis', true, () => {
    redisClient.set(id, data);
  })
}

const queryPsql = (id, res) => {
  nr.startSegment('queryPsql', true, () => {
    client.query(`select * from nearby inner join businesses on ${id} = businesses.place_id or nearby.nearby1 = businesses.place_id or nearby.nearby2 = businesses.place_id or nearby.nearby3 = businesses.place_id or nearby.nearby4 = businesses.place_id or nearby.nearby5 = businesses.place_id or nearby.nearby6 = businesses.place_id where nearby.place_id = ${id}`, (err, data) => {
      if (err) {
        res.status(500);
        res.send('not a valid id');
        console.log(err);
      } else {
        const nearby = [];
        let current;
        nr.startSegment('loop through response', true, () => {
          for (let i = 0; i < 7; i += 1) {
            if (data.rows[i].place_id === id) {
              current = data.rows[i];
            } else {
              nearby.push(data.rows[i]);
            }
          }
        });
        const dataStr = JSON.stringify([current, nearby]);
        addToRedis(id, dataStr);
        res.send([current, nearby]);
      }
    });
  })
}

module.exports = checkRedis;
