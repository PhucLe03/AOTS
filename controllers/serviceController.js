const Service = require("../models/services.js");

function getAllServices(req, res) {
  Service.find()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function getServiceById(req, res) {
  Service.findById(req.params.id)
    .then((service) => {
      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }
      res.status(200).json(service);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function createService(req, res) {
  const newService = new Service(req.body);
  newService
    .save()
    .then((savedService) => {
      res.status(201).json(savedService);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function updateService(req, res) {
  Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((service) => {
      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }
      res.status(200).json(service);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function deleteService(req, res) {
  Service.findByIdAndDelete(req.params.id)
    .then((service) => {
      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }
      res.status(204).json();
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  };