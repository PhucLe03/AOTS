const Service = require("../models/services.js");

async function getAllServices(req, res) {
  const services = await Service.find({});
  res.send(services);
}

async function getServiceById(req, res) {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: "Service not found." });
  }
  res.send(service);
}

async function createService(req, res) {
  const newService = new Service(req.body);
  const savedService = await newService.save();
  if (savedService) {
    res.send(savedService);
  }
}

async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!service) {
    return res.status(404).send();
  }
  res.send(service);
}

async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).send();
  }
  res.send(true);
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
