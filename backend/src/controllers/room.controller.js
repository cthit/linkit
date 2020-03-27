const uuid = require("uuid/v4");
const yup = require("yup");
const { deleteRoom } = require("../db/room.db");
const { editRoom } = require("../db/room.db");
const { getRoom } = require("../db/room.db");
const { getRooms } = require("../db/room.db");
const { addRoom } = require("../db/room.db");
const { put, del, post, get, to, isUUID, validateSchema } = require("../utils");

const roomSchema = yup.object().shape({
    name: yup.string("name must be a string").required("name is required"),
});

const handleAddRoom = async (req, res) => {
    const id = uuid();

    const schemaErrors = await validateSchema(roomSchema, req.body);

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

const handleGetRooms = async (req, res) => {
    const [err, rooms] = await to(getRooms());

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        res.status(200).send(rooms);
    }
};

const handleGetRoom = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, room] = await to(getRoom(id));
    if (room == null) {
        res.status(404).send("room doesn't exist");
        return;
    }
    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        res.status(200).send(room);
    }
};

const handleEditRoom = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const schemaErrors = await validateSchema(roomSchema, req.body);

    if (schemaErrors != null) {
        res.status(422).send(schemaErrors);
        return;
    }

    const [err, rowCount] = await to(editRoom(id, req.body));

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        if (rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    }
};

const handleDeleteRoom = async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        res.status(400).send("id is not an UUID");
        return;
    }

    const [err, rowCount] = await to(deleteRoom(id));

    if (err) {
        res.sendStatus(500);
        console.log(err);
    } else {
        if (rowCount === 0) {
            res.status(404).send("room doesn't exist");
        } else {
            res.sendStatus(200);
        }
    }
};

get("/room", handleGetRooms);
get("/room/:id", handleGetRoom);

post("/room", handleAddRoom);

put("/room/:id", handleEditRoom);

del("/room/:id", handleDeleteRoom);
