// const XLSX = require('xlsx')
const Renter = require('../models/Renter')

class RenterController {
    // [GET] /renter
    async Index(req, res) {
        const renters = await Renter.find({}).populate('room', 'name')
        res.send(renters)
    }

    // [POST] /renter/store
    Store(req, res) {
        const renter = new Renter(req.body)
        renter.save()
        res.json(renter)
    }

    // [GET] /renter/show/:id
    Show(req, res) {
        // 
    }

    // [PUT] /renter/update/:id
    async Update(req, res) {
        const _id = req.params.id;
        const renter = await Renter.findByIdAndUpdate(_id, req.body, { new: true });
        if (!renter) {
            return res.status(404).send();
        }
        res.send(renter);
    }

    // [DELETE] /renter/detele/:id
    async Delete(req, res) {
        const renter = await Renter.findByIdAndDelete(req.params.id)
        if (!renter) {
            return res.status(404).send()
        }
        res.send(true)
    }

    // [GET] /renter/export
    async Export(req, res) {
    }
}

module.exports = new RenterController