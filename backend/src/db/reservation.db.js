const { query } = require("../utils");

const getReservations = () =>
    query("SELECT * FROM room ORDER BY name", null, results => results.rows);

const getReservation = id =>
    query("SELECT * FROM room WHERE id = $1", [id], results =>
        results.rowCount > 0 ? results.rows[0] : null
    );

const addReservation = (id, data) =>
    query(
        "INSERT INTO reservation (id, title, description, begin_date, end_date) VALUES ($1, $2, $3, $4, $5)",
        [id, data.title, data.description, data.begin_date, data.end_date],
        results => results.rowCount
    );

const editReservation = (id, data) =>
    query(
        "UPDATE reservation SET title = $2, description = $3, begin_date = $4, end_date = $5, updated_at = NOW() WHERE id = $1",
        [data.id, data.title, data.description, data.begin_date, data.end_date],
        results => results.rowCount
    );

const deleteReservation = id =>
    query(
        "DELETE FROM reservation WHERE id = $1",
        [id],
        results => results.rowCount
    );

module.exports = {
    getReservations,
    getReservation,
    addReservation,
    editReservation,
    deleteReservation,
};
