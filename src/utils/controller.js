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
function realFormater(
  item,
  dateFormatString = "DD/MM/YYYY",
  sexString = ["Male", "Female"]
) {
  // item.birthday_format = moment(item.birthday).format(dateFormatString);
  // item.birthday_format_input = moment(item.birthday).format("YYYY-MM-DD");
  // item.birthday_format_input = item.birthday;
  item.birthday_format = dateFormat(item.birthday, dateFormatString);
  item.birthday_format_input = dateFormat(item.birthday, "YYYY-MM-DD");
  item.sex_f = item.sex ? sexString[0] : sexString[1];
}

//for Room
function unrealFormatter(item) {
  item.day_of_hire_format = dateFormat(item.day_of_hire, "DD/MM/YYYY");
  item.day_of_hire_format_input = dateFormat(item.day_of_hire, "YYYY-MM-DD");
  item.expiration_date_format = dateFormat(item.expiration_date, "DD/MM/YYYY");
  item.expiration_date_format_input = dateFormat(
    item.expiration_date,
    "YYYY-MM-DD"
  );
  if (item.type === "small") item.capacity = 1;
  else if (item.type === "medium") item.capacity = 2;
  else if (item.type === "large") item.capacity = 4;
  if (item.renter === 0) item.status = "empty";
  else if (item.renter < item.capacity) item.status = "available";
  else item.status = "full";
}

//for Service
// function anotherFormatter(item) {}

async function getUsers() {
  const data = api.get("/users");
  const users = (await data).data;
  users.map((user) => realFormater(user));
  return users;
}

async function createUser(data) {
  await api.post("/user", data);
}

async function getUserByID(id) {
  const user = api.get(`/user/${id}`);
  const temp = (await user).data;
  realFormater(temp);
  return temp;
}

async function updateUser(id, data) {
  await api.put(`/user/${id}`, data);
}

async function deleteUser(id) {
  api.delete(`/user/${id}`);
}

async function getRooms() {
  const data = api.get("/rooms");
  const rooms = (await data).data;
  rooms.map((room) => unrealFormatter(room));
  return rooms;
}

async function getMTRooms() {
  const allRooms = await getRooms();
  const filtered = allRooms.filter((item) => !item.status.includes("full"));
  return filtered;
}

async function addRenterToRoom(id, amount) {
  const room = await api.get(`/room/${id}`);
  room.data.renter += amount;
  await api.put(`/room/${id}`, room.data);
}

async function createRoom(data) {
  await api.post("/room", data);
}

async function getRoomByID(id) {
  const room = api.get(`/room/${id}`);
  const temp = (await room).data;
  unrealFormatter(temp);
  return temp;
}

async function updateRoom(id, data) {
  await api.put(`/room/${id}`, data);
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
  await api.post("/service", data);
}

async function updateService(id, data) {
  await api.put(`/service/${id}`, data);
}

async function getServiceByID(id) {
  const service = api.get(`/service/${id}`);
  return (await service).data;
}

async function deleteService(id) {
  api.delete(`service/${id}`);
}

async function RentersExport() {
  // Make a GET request to the Node.js endpoint
  const response = await api.get("/users/exportxl", {
    responseType: "blob", // Specify responseType as 'blob' to receive binary data
  });

  // Create a Blob and create a download link
  const blob = new Blob([response.data], {
    type: "application/octet-stream",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "renters.xlsx";
  a.click();

  // Clean up by revoking the Object URL
  window.URL.revokeObjectURL(url);
}

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  // HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

async function ContractExport(renter) {
  // const room = rooms.filter((room) => room._id === renter.room)[0];
  const room = await getRoomByID(renter.room.roomId);
  // console.log(room);
  const doc = new Document({
    sections: [
      {
        properties: {
          type: SectionType.CONTINUOUS,
        },
        children: [
          new Paragraph({
            text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
            // heading: HeadingLevel.HEADING_4,
            alignment: AlignmentType.CENTER,
            // color:
          }),
          new Paragraph({
            text: "Độc lập - Tự do - Hạnh phúc",
            // heading: HeadingLevel.HEADING_5,
            alignment: AlignmentType.CENTER,
            // color:
            children: [
              new TextRun({
                text: " ",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            text: "HỢP ĐỒNG THUÊ NHÀ TRỌ",
            // heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            // color:
            border: {
              bottom: {
                color: "auto",
                space: 2,
                style: "single",
                size: 12,
              },
            },
          }),

          new Paragraph({
            text: "",
            // heading: HeadingLevel.HEADING_6,
            alignment: AlignmentType.LEFT,
            break: 2,
            children: [
              new TextRun({
                text: "Căn cứ Luật Nhà ở ngày 25 tháng 11 năm 2014;",
                break: 2,
              }),
              new TextRun({
                text: "Căn cứ vào các quy định pháp luật có liên quan;",
                break: 1,
              }),
              new TextRun({
                text: "Chúng tôi gồm:\n",
                break: 1,
              }),
            ],
          }),
          new Paragraph({ text: "", break: 2 }),
          new Paragraph({
            text: "BÊN CHO THUÊ NHÀ",
            break: 2,
            // heading: HeadingLevel.HEADING_4,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "Ông: ",
                break: 1,
              }),
              new TextRun({
                text: "CCCD số:",
                break: 1,
              }),
              new TextRun({
                text: "HKTT/Chỗ ở hiện tại:",
                break: 1,
              }),
              new TextRun({
                text: "Điện thoại liên hệ:",
                break: 1,
              }),
            ],
          }),
          new Paragraph({ text: "", break: 2 }),
          new Paragraph({
            text: "BÊN THUÊ NHÀ Ở",
            // heading: HeadingLevel.HEADING_4,
            break: 2,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Ông (bà): ${renter.name}`,
                break: 1,
              }),
              new TextRun({
                text: `CCCD số: ${renter.idcard}`,
                break: 1,
              }),
              new TextRun({
                text: `HKTT/Chỗ ở hiện tại: ${renter.address}, ${renter.commune}, ${renter.district}, ${renter.province}`,
                break: 1,
              }),
              new TextRun({
                text: `Điện thoại liên hệ: ${renter.phone}`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            text: "...",
            break: 2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "Thông tin phòng trọ:",
            break: 2,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Tên phòng: ${room.name}`,
                break: 1,
              }),
              new TextRun({
                text: `Ngày thuê: ${room.day_of_hire_format}`,
                break: 1,
              }),
              new TextRun({
                text: `Ngày hết hạn: ${room.expiration_date_format}`,
                break: 1,
              }),
            ]
          }),
          
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, `HĐ ${renter.name}`);
    console.log("Document created successfully");
  });
}

export default {
  setTitle,

  getUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
  RentersExport,
  ContractExport,

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
};
