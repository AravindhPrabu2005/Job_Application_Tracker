require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ❌ DELETE this line entirely — not needed in Express v5
// app.options('(.*)', cors(corsOptions));

app.use(express.json());

mongoose.connect("mongodb+srv://aravindhprabu2005:aravindhprabu2005@cluster0.xczizsn.mongodb.net/jobtracker?retryWrites=true&w=majority")
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err.message));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
