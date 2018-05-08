const { Pool } = require('pg');

const client = new Pool({ database: 'zaget' });

const psqlQuery = (req, res) => {
  const placeId = parseInt(req.params.id, 10);
  client.query(`select * from nearby inner join businesses on ${placeId} = businesses.place_id or nearby.nearby1 = businesses.place_id or nearby.nearby2 = businesses.place_id or nearby.nearby3 = businesses.place_id or nearby.nearby4 = businesses.place_id or nearby.nearby5 = businesses.place_id or nearby.nearby6 = businesses.place_id where nearby.place_id = ${placeId}`, (err, data) => {
    if (err) {
      res.status(500);
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
      res.send([current, nearby]);
    } 
  });
};

module.exports = psqlQuery;
