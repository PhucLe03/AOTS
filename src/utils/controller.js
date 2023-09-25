import { api } from "@/utils/axios";
import moment from "moment";

function setTitle(title) {
  const theTitle = document.querySelector("head title");
  theTitle.textContent = title;
}

function formatDate(data, formatString) {
  data.map((item) => {
    item.birthday_format = moment(item.birthday).format(formatString);
  });
  return data;
}

async function getUsers() {
  const users = api.get("/users");
  return formatDate((await users).data.User, "DD/MM/YYYY");
}

async function getRooms() {
  const rooms = api.get("/rooms");
  return (await rooms).data;
}

async function getServices() {
  const services = api.get("/services");
  return (await services).data;
}

async function getUserByID(id) {
  const user = api.get("/user/" + id);
  const temp = (await user).data
  temp.birthday_format = moment(temp.birthday).format("DD/MM/YYYY");
  return temp;
}

async function getRoomByID(id) {
  const room = api.get("/room/" + id);
  return (await room).data;
}

async function getServiceByID(id) {
  const service = api.get("/service/" + id);
  return (await service).data;
}

async function getRoomServices(id) {
  const service = api.get("/room/" + id + "/services");
  return (await service).data;
}

async function deleteService(id) {
  // api.delete('/service/' + id);
  api.delete(`service/${id}`);
}

export default {
  setTitle,

  getUsers,
  getRooms,
  getServices,

  getUserByID,
  getRoomByID,
  getServiceByID,

  getRoomServices,

  deleteService,
  // data() {
  //     return {
  //         users : null,
  //         rooms : null,
  //         services : null,
  //     }
  // },
};
