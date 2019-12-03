const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        itemID: {type: String, required: true},
        itemName:{type: String, required: true},
        url:{type:String,required:true},
        companyID: {type: String, required:true},
        category:{type:String, required: true},
        brand:{type:String, required: true},
        model:{type:String, required: true},
        sitingcapacity:{type:Number, required: false},
        color:{type:String, required: false},
        location:{type:String, required: true},
        rate:{type:Number, required: true},
        status:{type:Boolean, required: true},

    }

);
    module.exports = mongoose.model('Items',ItemSchema);