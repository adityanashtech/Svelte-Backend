const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
    {
        employee_name: {
            type: String,
            required: [true, "Please enter a batch name"]
        },
        employee_id: {
            type: Number,
            unique:true,
            required: [true, "Please enter employee id"]
        },
        employee_batch: {
            type: String,
            required: true
        },
        practice:{
          type: String,
        },
        employee_details: {
            type: {
              age: {
                type: Number,
                required: true,
              },
              dob: {
                type: String,
              },
              gender: {
                type: String,
              },
              personal_email: {
                type: String,
                unique: true,
              },
              phone_number: {
                type: Number,
                unique:true
              },
              github_id: {
                type: String,
              },
              address: {
                type: String,
              },
              education: {
                type: {
                    degree:{
                        type: String,
                    },
                    completion_year:{
                        type: String,
                    },
                    college_name:{
                        type: String,
                    },
                    percentage:{
                        type: String,
                    },
                }
              },
            },
          },
        employee_status: {
            type: String,
            required: true
        },
        employee_number: {
            type: Number,
            required: true,
            default: 0
        },
        employee_email: {
            type: String,
            unique:true,
            required: true,
            default: 0
        }
    }
)


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;