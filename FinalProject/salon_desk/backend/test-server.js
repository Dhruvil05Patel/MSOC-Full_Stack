import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('✅ Basic test server is working');
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
});