import EventModel from "./events-model.js";

export const createEvent = async (event) => {
    return await EventModel.create(event);
}

export const findAllEvents = async () => {
    return await EventModel.find();
}

export const findEventById = async (eventId) => {
    return await EventModel.findById(eventId);
}
export const findEventByUserId = async (Eorganizer) => {
    console.log("From dao" + Eorganizer);
    return await EventModel.find({Eorganizer : Eorganizer});
}



export const updateEvent = async (eventId, event) => {
    return await EventModel.updateOne({_id: eventId}, {$set: event})
}

export const deleteEvent = async (eventId) => {
    return await EventModel.deleteOne({_id: eventId})
}

export const searchEvents = async (query) => {
    return await EventModel.find({$text: {$search: query}})
}