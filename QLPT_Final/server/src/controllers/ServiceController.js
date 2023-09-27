const Service = require('../models/Service')

class ServiceController {
    // [GET] /service
    async Index(req, res) {
        const services = await Service.find({})
        res.send(services)
    }

    // [POST] /service/store
    async Store(req, res) {
        const service = new Service(req.body)
        await service.save()
        res.json(service)
    }

    // [GET] /service/show/:id
    Show(req, res) {
        // 
    }

    // [PUT] /service/update/:id
    async Update(req, res) {
        const _id = req.params.id;

        const service = await Service.findByIdAndUpdate(_id, req.body, { new: true });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    }

    // [DELETE] /service/detele/:id
    async Delete(req, res) {
        const service = await Service.findByIdAndDelete(req.params.id)
        if (!service) {
            return res.status(404).send()
        }
        res.send(true)
    }
}

module.exports = new ServiceController