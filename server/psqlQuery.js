const { Pool } = require('pg');

const client = new Pool({ database: 'zaget' });

const psqlQuery = (req, res) => {
  const placeId = parseInt(req.params.id, 10);
  client.query(`select * from nearby inner join businesses on ${placeId} = businesses.place_id or nearby.nearby1 = businesses.place_id or nearby.nearby2 = businesses.place_id or nearby.nearby3 = businesses.place_id or nearby.nearby4 = businesses.place_id or nearby.nearby5 = businesses.place_id or nearby.nearby6 = businesses.place_id where nearby.place_id = ${placeId}`, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    }
    const nearby = [];
    for (let i = 1; i < 7; i += 1) {
      nearby.push(data.rows[i]);
    }
    res.send([data.rows[0], nearby]);
  });
};

module.exports = psqlQuery;
