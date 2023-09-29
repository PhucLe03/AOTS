const Service = require('../models/Service')

class ServiceController {
    // [GET] /service
    async Index(req, res) {
        try {
            const services = await Service.find({})
            res.send(services)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [POST] /service/store
    async Store(req, res) {
        try {
            const service = new Service(req.body)
            await service.save()
            res.json(service)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [GET] /service/show/:id
    Show(req, res) {
        // 
    }

    // [PUT] /service/update/:id
    async Update(req, res) {
        try {
            const _id = req.params.id;

            const service = await Service.findByIdAndUpdate(_id, req.body, { new: true });
            if (!service) {
                return res.status(404).send();
            }
            res.send(service);
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [DELETE] /service/detele/:id
    async Delete(req, res) {
        try {
            const service = await Service.findByIdAndDelete(req.params.id)
            if (!service) {
                return res.status(404).send()
            }
            res.send(true)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }
}

module.exports = new ServiceController