const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// this is out database data structure "schema"
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    {timestamps: true}
);

// Exporting the schema so it can be modified via Node.js
module.exports = mongoose.model("Data", DataSchema)
