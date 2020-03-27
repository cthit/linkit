const uuid = require("uuid/v4");
const yup = require("yup");
const { deleteRoom } = require("../db/room.db");
const { editRoom } = require("../db/room.db");
const { getRoom } = require("../db/room.db");
const { getRooms } = require("../db/room.db");
const { addRoom } = require("../db/room.db");
const { put, del, post, get, to, isUUID } = require("../utils");

const reservationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    begin_date: yup.string().required(),
    end_date: yup.string().required(),
});

const handleAddReservation = async (req, res) => {
    const id = uuid();

    const schemaErrors = await validateSchema(reservationSchema, req.body);

    if (schemaErrors != null) {
        res.status(422).send(schemaErrors);
        return;
    }

    const [err] = await to(addRoom(id, { ...req.body }));

    if (err) {
        res.sendStatus(500);
    } else {
        res.status(201).send({ id });
    }
};

const handleGetReservations = async (req, res) => {};

module.exports = {};
