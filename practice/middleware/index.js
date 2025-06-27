const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    // You can change 'student' to 'admin' here to test admin routes
    req.user = { role: "student" }; 
    next();
});

// Import your router
const route = require('./routes/route')

// Mount the router at /api
app.use('/api', route)

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
