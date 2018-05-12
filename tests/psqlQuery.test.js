const app = require('../server/index.js');
const request = require('supertest');

describe('Postgres Query', () => {
  let data;
  const placeId = 9999999;
  beforeAll((done) => {
    request(app).get(`/api/restaurants/${placeId}/nearby`).then((response) => {
      data = JSON.parse(response.text);
      done();
    })
  })
  test('expect data to be returned in an array with two items', () => {
    expect(data.length).toBe(2)
  })
  test('expect first item in response to have matching placeId', () => {
    expect(data[0].place_id).toBe(placeId);
  })
  test('expect second item in response to be an array containing 6 items', () => {
    expect(data[1].length).toBe(6);
  })
})
