const mongoose = require("mongoose");
const XLSX = require("xlsx");
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const User = require("../models/users.js");

// Get all users
async function getAllUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.send(user);
}

async function getUserRoomById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.send(user.room);
}

async function createUser(req, res) {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  if (savedUser) {
    res.send(savedUser);
  }
}

async function updateUser(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return res.status(404).send();
  }
  res.send(user);
}

async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  res.send(true);
}

async function ExportToXL(req, res) {
  try {
    const renters = await User.find({}).populate({
      path: "room",
      select: "name",
      populate: { path: "services", select: "name" }, // Populate the 'room' field and the 'services' field within the 'room' model
    });

    const data = renters.map((item) => {
      return {
        name: item.name,
        phone: item.phone,
        idcard: item.idcard,
        birthday: item.birthday,
        sex: item.sex ? "Nam" : "Nữ",
        address: `${item.address} ${item.commune} ${item.district} ${item.province}`,
        status: item.status,
        room: item.room?.name,
        // "service": item.room?.services.map(s => s.name).join(', '),
        main_contact: item.main_contact ? "✓" : null,
      };
    });
    // res.send(data);

    // Create a worksheet from your data
    const ws = XLSX.utils.json_to_sheet(data);

    // // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // // Generate a temporary file path
    const tempFilePath = "./temp.xlsx";

    // // Write the XLSX file to the temp path
    XLSX.writeFile(wb, tempFilePath);

    // // Send the file as a response
    res.download(tempFilePath, "exported-data.xlsx", () => {
      //     // After the file is sent, delete the temporary file
      // fs.unlink(tempFilePath);
    });
  } catch (err) {
    console.error(err); // Log lỗi để kiểm tra
    res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
  }
}

async function ExportToDOCX(req, res) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: "Foo Bar",
                bold: true,
              }),
              new TextRun({
                text: "\tGithub is the best",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
  });
  // const tempFilePath = "./temp.docx";

  // Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
//     saveAs(blob, "example.docx");
// });

}

module.exports = {
  getAllUsers,
  getUserById,
  getUserRoomById,
  createUser,
  updateUser,
  deleteUser,
  ExportToXL,
  ExportToDOCX,
};
