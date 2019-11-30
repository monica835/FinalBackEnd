const Items = require('../models/model.item');


//adding items to db
exports.create('/items', (req, res) => {
    const ItemToCreate = new Items(
        {
            itemID: req.body.itemID,
            companyID: req.body.companyID,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            sitingcapacity: req.body.sitingcapacity,
            color: req.body.color,
            location: req.body.location,
            rate: req.body.rate,
            status: req.body.status,

        }
    );
    ItemToCreate.save((err, items) => {
        if (err) {
            res.send(err);
        }
        res.json(items);
    });
});

//getting all Items
exports.getAll('/itemList', (req, res) => {
    Items.find({}, (err, items) => {
        if (err) {
            res.send(err);
        }
        res.send({ items: items });
    });
});


//getting items by ID
exports.getById = (req, res) => {
    Items.findById(req.params.itemID, (err, item) => {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
}

/**
 * Function used to delete by id an item.
 */
exports.delete = (req, res) => {
    Items.findByIdAndDelete(req.params.itemID,
        (err,item) => {
        if(err){
            res.send(err);
        }
        res.json(item);
    });
}

