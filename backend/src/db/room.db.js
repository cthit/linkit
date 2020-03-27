const { query } = require("../utils");

const getRooms = () =>
  query("SELECT * FROM room ORDER BY name", null, results => results.rows);

const getRoom = id =>
  query("SELECT * FROM room WHERE id = $1", [id], results =>
    results.rowCount > 0 ? results.rows[0] : null
  );

const addRoom = (id, data) =>
  query(
    "INSERT INTO room (id, name) VALUES ($1, $2)",
    [id, data.name],
    results => results.rowCount
  );

const editRoom = (id, data) =>
  query(
    "UPDATE room SET name = $2 WHERE id = $1",
    [data.id, data.name],
    results => results.rowCount
  );

const deleteRoom = id =>
  query("DELETE FROM room WHERE id = $1", [id], results => results.rowCount);

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  editRoom,
  deleteRoom
};
