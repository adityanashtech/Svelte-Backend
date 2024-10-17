## About Svelte-backend

This project is created with Node.js, Express and MongoDB.


### API Features

The application can create, read, update and delete data, for example: **batches** & **Employees**, in a database. 

### POST Body for Batches
```
{
    "batch_name": "Apr_2020",
    "batch_date": "2020/04/30",
    "batch_status": true,
    "total_employee": 20
}
```

### POST Body for Employees
```
{
    "employee_name": "Anuj Tomar",
    "employee_batch": "Nov_21",
    "employee_score": 70,
    "employee_email": "anuj.tomar@nashtechglobal.com"
}
```

For PUT and DELETE send ID as params.

### Run this Application
To run this application first do:
```
npm i
```

Then 
```
npm run dev
```