const express =  require('express');
const app = express();
const connectDB = require('./db');
const user = require('./routes/users');

const PORT = 3000;

//body parser
app.use(express.json());
connectDB();

app.use('/api', user);

app.get('/', (req, res)=>{
    console.log("page router");
    res.send("Hello");
})
app.listen(PORT, ()=>{
    console.log("I am connecting")
})