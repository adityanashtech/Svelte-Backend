const mongoose = require('mongoose')

const batchSchema = mongoose.Schema(
    {
        batch_name: {
            type: String,
            unique:true,
            required: [true, "Please enter a batch name"]
        },
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true
        },
        batch_status: {
            type: String,
            required: true,
        },
        total_employee: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)


const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;