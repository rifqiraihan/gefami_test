const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const userId = req.header('User-id');
  const scope = req.header('Scope');

  if (userId !== 'ifabula' || scope !== 'user') {
    return res.status(401).json({
      responseCode: 401,
      responseMessage: 'UNAUTHORIZED',
    });
  }

  next();
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Data berhasil diambil (GET)' });
});

app.post('/api/data', (req, res) => {
  const { content } = req.body;
  res.json({ message: 'Data berhasil dikirim (POST)', content });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
