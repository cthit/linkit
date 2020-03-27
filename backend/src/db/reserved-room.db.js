const { query } = require("../utils");

const getReservationRooms = reservationId =>
    query(
        "SELECT * FROM reserved_room WHERE reserved_room.reserved_room = $1",
        [reservationId],
        results => results.rows
    );

const getRoomReservations = roomId =>
    query(
        "SELECT * FROM reserved_room WHERE reserved_room.room_id = $1",
        [roomId],
        results => results.rows
    );
