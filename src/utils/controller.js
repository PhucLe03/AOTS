import {api} from "@/utils/axios";

function setTitle(title) {
    const theTitle = document.querySelector("head title");
    theTitle.textContent = title;
}

async function getUsers() {
    const users = api.get('/users');
    return (await users).data.User;
}

async function getRooms() {
    const rooms = api.get('/rooms');
    return (await rooms).data;
}

async function getServices() {
    const services = api.get('/services');
    return (await services).data;
}

async function getUserByID(id) {
    const user = api.get('/user/' + id);
    return (await user).data;
}

async function getRoomByID(id) {
    const room = api.get('/room/' + id);
    return (await room).data;
}

async function getServiceByID(id) {
    const service = api.get('/service/' + id);
    return (await service).data;
}

async function getRoomServices(id) {
    const service = api.get('/room/' + id + '/services');
    return (await service).data;
}


export default {
    setTitle,
    getUsers,
    getRooms,
    getServices,
    getUserByID,
    getRoomByID,
    getRoomServices,
    getServiceByID,
    // data() {
    //     return {
    //         users : null,
    //         rooms : null,
    //         services : null,
    //     }
    // },
}