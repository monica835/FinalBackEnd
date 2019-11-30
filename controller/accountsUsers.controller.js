const AccountsUsers = require('../models/model.accountsUsers.js');

// exports.create('/accountsUsers', async (req, res) => {
//     let accountsUsersToCreate = new AccountsUsers(
//         {
//             lastname: req.body.lastname,
//             firstname: req.body.firstname,
//             address: req.body.address,
//             age: req.body.age,
//             email: req.body.email,
//             contact_no: req.body.contact_no,
//             username: req.body.username,
//             password: req.body.password

//         }
//     );


module.exports.create = (req, res) => {
    const accountsUsersToCreate = new AccountsUsers(
        {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            address: req.body.address,
            age: req.body.age,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
            username: req.body.username,
            password: req.body.password
        });

    accountsUsersToCreate.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });

}

module.exports.AllUsers = (req, res) => {
    AccountsUsers.findOne(req.body, (err, user) => {
        if (err) {
            res.json(err)
        } else if (user != null) {
            res.json(user)
        }
        // req.checkbody('password', 'Password do not match').equals(req.body.password);
    })
}

// module.exports.createUser = (req, res, name) => {
//     query.findOne({name})
//             .then(quer => {
//                 if (!quer) {
//                     return res.status(404).send({
//                         message: "Can't find id: " + name
//                     });
//                 }
//                 res.send(quer);
//             }).catch(err => {
//                 if (err.kind === 'ObjectId') {
//                     return res.status(404).send({
//                         message: "Can't find id:" + name
//                     });
//                 }
//                 return res.status(500).send({
//                     message: "Error to retrieve " + name
//                 });
//             });
//     };
// accountsUsersToCreate.save((err, accountsUsers) => {
//     if (err) {
//         res.send(err);
//     }
//     res.json(accountsUsers);
// });

// });

// app.getAll('/accountsUserList', (req, res) => {
//     AccountsUsers.find({}, (err, AccountsUsers) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({ AccountsUsers: AccountsUsers });
//     });

// });

exports.getById = (req, res) => {
    AccountsUsers.findById(req.params.accountsUsersID, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}



