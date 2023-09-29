const XLSX = require('xlsx')
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow } = require('docx');
const Renter = require('../models/Renter')

class RenterController {
    // [GET] /renter
    async Index(req, res) {
        try {
            const renters = await Renter.find({}).populate('room', 'name')
            res.send(renters)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [POST] /renter/store
    Store(req, res) {
        try {
            const renter = new Renter(req.body)
            renter.save()
            res.json(renter)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [GET] /renter/show/:id
    Show(req, res) {
        // 
    }

    // [PUT] /renter/update/:id
    async Update(req, res) {
        try {
            const _id = req.params.id;
            console.log(_id);
            const renter = await Renter.findByIdAndUpdate(_id, req.body, { new: true });
            if (!renter) {
                return res.status(404).send();
            }
            res.send(renter);
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [DELETE] /renter/detele/:id
    async Delete(req, res) {
        try {
            const renter = await Renter.findByIdAndDelete(req.params.id)
            if (!renter) {
                return res.status(404).send()
            }
            res.send(true)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [GET] /renter/export
    async Export(req, res) {
        try {
            const renters = await Renter.find({})
                .populate({
                    path: 'room',
                    select: 'name',
                    populate: { path: 'services', select: 'name' } // Populate the 'room' field and the 'services' field within the 'room' model
                })

            const data = renters.map((item) => {
                return {
                    "name": item.name,
                    "phone": item.phone,
                    "id_card": item.id_card,
                    "birth_day": item.birth_day,
                    "sex": item.sex ? 'Nam' : 'Nữ',
                    "address": `${item.address} ${item.commune} ${item.district} ${item.province}`,
                    "status": item.status,
                    "room": item.room?.name,
                    "service": item.room?.services.map(s => s.name).join(', '),
                    "main_contact": item.main_contact ? '✓' : null,
                }
            })

            // Create a worksheet from your data
            const ws = XLSX.utils.json_to_sheet(data);

            // Create a workbook and add the worksheet
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');

            // Generate a temporary file path
            const tempFilePath = './temp.xlsx';

            // Write the XLSX file to the temp path
            XLSX.writeFile(wb, tempFilePath);

            // Send the file as a response
            res.download(tempFilePath, 'exported-data.xlsx', () => {
                // After the file is sent, delete the temporary file
                fs.unlink(tempFilePath);
            });
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    async Export_Docx(req, res) {
        try {
            const renters = await Renter.find({})
                .populate({
                    path: 'room',
                    select: 'name',
                    populate: { path: 'services', select: 'name' }
                })
    
            const data = renters.map((item) => {
                return {
                    "name": item.name,
                    "phone": item.phone,
                    "id_card": item.id_card,
                    "birth_day": item.birth_day,
                    "sex": item.sex ? 'Nam' : 'Nữ',
                    "address": `${item.address} ${item.commune} ${item.district} ${item.province}`,
                    "status": item.status,
                    "room": item.room?.name,
                    "service": item.room?.services.map(s => s.name).join(', '),
                    "main_contact": item.main_contact ? '✓' : null,
                }
            })
    
            // Create a new document
            const doc = new Document();
    
            // Add a heading to the document
            doc.addSection({
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Danh sách người thuê nhà"),
                        ],
                    }),
                ],
            });
    
            // Create a table to display the data
            const table = new Table({
                rows: [
                    new TableRow({
                        children: Object.keys(data[0]).map(key => new TableCell({
                            children: [new Paragraph(key)],
                        })),
                    }),
                    ...data.map(item => new TableRow({
                        children: Object.values(item).map(value => new TableCell({
                            children: [new Paragraph(value)],
                        })),
                    })),
                ],
            });
    
            doc.addSection({
                properties: {},
                children: [table],
            });
    
            // Generate a temporary file path
            const tempFilePath = './temp.docx';
    
            // Export the DOCX file
            const buffer = await Packer.toBuffer(doc);
            fs.writeFileSync(tempFilePath, buffer);
    
            // Send the file as a response
            res.download(tempFilePath, 'exported-data.docx', () => {
                // After the file is sent, delete the temporary file
                fs.unlink(tempFilePath, (err) => {
                    if (err) {
                        console.error('Lỗi khi xóa tệp tạm thời: ', err);
                    }
                });
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }


}


module.exports = new RenterController