const { Pool } = require('pg');
const redis = require('redis');

const pool = new Pool({ database: 'zaget', host: 'zaget.cvjywnma6qrl.us-west-1.rds.amazonaws.com', user: 'dmytromarchenko1998', password: 'Tiger101998!' });

const redisClient = redis.createClient(6379, '13.57.222.179');

const Query = (req, res) => {
  redisClient.get(req.params.id, (err, reply) => {
    const placeId = parseInt(req.params.id, 10);
    if (reply === null) {
      console.log('not cached', placeId)
      psqlQuery(placeId, res);
    } else {
      console.log('cached', placeId)
      const data = JSON.parse(reply);
      res.send(data);
    }
  })
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
        const nearby = [];
        let current;
        for (let i = 0; i < 7; i += 1) {
          if (data.rows[i].place_id === placeId) {
            current = data.rows[i];
          } else {
            nearby.push(data.rows[i]);
          }
        }
        const idStr = JSON.stringify(placeId);
        const dataStr = JSON.stringify([current, nearby]);
        redisClient.set(idStr, dataStr)
        res.send([current, nearby]);
      }
    })
  }) 
}

module.exports = Query;
