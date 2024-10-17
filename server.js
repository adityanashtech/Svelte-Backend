const express = require('express')
const mongoose = require('mongoose')
const Batch = require('./models/batchModel')
const Employee =require('./models/employeeModel')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors');
dotenv.config()
app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

//GET for Batches
app.get('/batches', async(req, res) => {
    try {
        const batches = await Batch.find({});
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET for Employees
app.get('/employees', async(req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/batches/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const batch = await Batch.findById(id);
        res.status(200).json(batch);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/employees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// POST for Batches
app.post('/batches', async(req, res) => {
    try {
        const batch = await Batch.create(req.body)
        res.status(200).json(batch);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// POST for Employees
app.post('/employees', async(req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(200).json(employee);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// update a batch
app.put('/batches/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const batch = await Batch.findByIdAndUpdate(id, req.body);
        // we cannot find any batch in database
        if(!batch){
            return res.status(404).json({message: `cannot find any batch with ID ${id}`})
        }
        const updatedBatch = await Batch.findById(id);
        res.status(200).json(updatedBatch);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update a employee
app.put('/employees/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        // we cannot find any employee in database
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        const updatedEmployee = await Employee.findById(id);
        res.status(200).json(updatedEmployee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete multiple batch
app.delete('/batches/delete', async (req, res) => {
    try {
      const { ids } = req.body;
  
      const deletedBatches = await Batch.deleteMany({ batch_name: { $in: ids } });
      if (deletedBatches.deletedCount === 0) {
        return res.status(404).json({ message: "No batches found with the provided IDs" });
      }
  
      res.status(200).json({ message: "Batches deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.delete('/batches/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const batch = await Batch.findByIdAndDelete(id);
        if(!batch){
            return res.status(404).json({message: `cannot find any batch with ID ${id}`})
        }
        res.status(200).json(batch);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete multiple employee
app.delete('/employees/delete', async (req, res) => {
    try {
      const { ids } = req.body;
  
      const deletedEmployees = await Employee.deleteMany({ _id: { $in: ids } });
      if (deletedEmployees.deletedCount === 0) {
        return res.status(404).json({ message: "No Employees found with the provided IDs" });
      }
  
      res.status(200).json({ message: "Employees deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.delete('/employees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})