import { api } from "@/utils/axios";
import moment from "moment";

function setTitle(title) {
  const theTitle = document.querySelector("head title");
  theTitle.textContent = title;
}

// function formater(data, dateFormatString = "DD/MM/YYYY") {
//   data.map((item) => {
//     item.birthday_format = moment(item.birthday).format(dateFormatString);
//     item.sex_f = item.sex ? "Male" : "Female";
//   });
//   return data;
// }

function dateFormat(date, formatString) {
  return moment(date).format(formatString);
}

//for User
function realFormater(item, dateFormatString = "DD/MM/YYYY", sexString = ["Male", "Female"]) {
  // item.birthday_format = moment(item.birthday).format(dateFormatString);
  // item.birthday_format_input = moment(item.birthday).format("YYYY-MM-DD");
  // item.birthday_format_input = item.birthday;
  item.birthday_format = dateFormat(item.birthday,dateFormatString);
  item.birthday_format_input = dateFormat(item.birthday,"YYYY-MM-DD");
  item.sex_f = item.sex ? sexString[0] : sexString[1];
}

//for Room
function unrealFormatter(item) {
  item.day_of_hire_format = dateFormat(item.day_of_hire,"DD/MM/YYYY");
  item.day_of_hire_format_input = dateFormat(item.day_of_hire,"YYYY-MM-DD");
  item.expiration_date_format = dateFormat(item.expiration_date,"DD/MM/YYYY");
  item.expiration_date_format_input = dateFormat(item.expiration_date,"YYYY-MM-DD");
  if (item.type==='small') item.capacity = 1;
  else if (item.type==='medium') item.capacity = 2;
  else if (item.type==='large') item.capacity = 4;
  if (item.name<item.capacity) item.status = 'available';
  else item.status = 'full';
}

//for Service
// function anotherFormatter(item) {}

async function getUsers() {
  const data = api.get("/renters");
  const users = (await data).data;
  users.map((user) => realFormater(user));
  return users;
}

async function createUser(data) {
  await api.post('/renter', data);
}

async function getUserByID(id) {
  const user = api.get(`/renter/${id}`);
  const temp = (await user).data;
  realFormater(temp);
  return temp;
}

async function updateUser(id,data) {
  await api.put(`/renter/${id}`,data);
}

async function deleteUser(id) {
  api.delete(`/renter/${id}`);
}

async function getRooms() {
  const data = api.get("/rooms");
  const rooms = (await data).data;
  rooms.map((room) => unrealFormatter(room));
  return rooms;
}

async function getMTRooms() {
  const allRooms = await getRooms();
  const filtered = allRooms.filter(item => item.status.includes('available'))
  return filtered;
}

async function addRenterToRoom(id, amount) {
  const room = await api.get(`/room/${id}`);
  room.data.renter += amount;
  await api.put(`/room/${id}`, room.data);
}

async function createRoom(data) {
  await api.post('/room', data);
}

async function getRoomByID(id) {
  const room = api.get(`/room/${id}`);
  const temp = (await room).data;
  unrealFormatter(temp);
  return temp;
}

async function updateRoom(id,data) {
  await api.put(`/room/${id}`,data);
}

async function getRoomServices(id) {
  const service = await api.get(`/room/${id}` + "/services");
  // const serId = service.data.serviceId;
  // const theSer = await api.get("service/" + serId);
  // return (theSer).data;
  return service.data;
}

async function deleteRoom(id) {
  api.delete(`room/${id}`);
}

async function getServices() {
  const services = api.get("/services");
  return (await services).data;
}

async function createService(data) {
  await api.post('/service', data);
}

async function updateService(id,data) {
  await api.put(`/service/${id}`,data);
}

async function getServiceByID(id) {
  const service = api.get(`/service/${id}`);
  return (await service).data;
}

async function deleteService(id) {
  api.delete(`service/${id}`);
}

export default {
  setTitle,

  getUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
  
  getRooms,
  getMTRooms,
  addRenterToRoom,
  createRoom,
  getRoomByID,
  updateRoom,
  getRoomServices,
  deleteRoom,
  
  getServices,
  createService,
  getServiceByID,
  updateService,
  deleteService,

  // data() {
  //     return {
  //         users : null,
  //         rooms : null,
  //         services : null,
  //     }
  // },
};
