const express = require('express')
const { get } = require('./routes/items')
const app = express()
const port = 3000

const items = require('./routes/items.js');
const birds = require('./routes/birds.js');

app.use('backend',items);
app.use('birds',birds);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
