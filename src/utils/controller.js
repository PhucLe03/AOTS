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

function realFormater(item, dateFormatString = "DD/MM/YYYY", sexString = ["Male", "Female"]) {
  item.birthday_format = moment(item.birthday).format(dateFormatString);
  item.sex_f = item.sex ? sexString[0] : sexString[1];
}

async function getUsers() {
  const data = api.get("/users");
  const users = (await data).data;
  users.map((user) => realFormater(user));
  return users;
}

async function getUserByID(id) {
  const user = api.get("/user/" + id);
  const temp = (await user).data;
  realFormater(temp);
  return temp;
}

async function getRooms() {
  const rooms = api.get("/rooms");
  return (await rooms).data;
}

async function getRoomByID(id) {
  const room = api.get("/room/" + id);
  return (await room).data;
}

async function getRoomServices(id) {
  const service = api.get("/room/" + id + "/services");
  return (await service).data;
}

async function getServices() {
  const services = api.get("/services");
  return (await services).data;
}

async function createService(data) {
  await api.post('/service', data);
}

async function updateService(id,data) {
  await api.put('/service/'+id,data);
}

async function getServiceByID(id) {
  const service = api.get("/service/" + id);
  return (await service).data;
}

async function deleteService(id) {
  api.delete(`service/${id}`);
}

export default {
  setTitle,

  getUsers,
  getUserByID,
  
  getRooms,
  getRoomByID,
  getRoomServices,
  
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
