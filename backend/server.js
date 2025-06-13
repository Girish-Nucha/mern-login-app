const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/logindb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.json({ success: false, message: 'User already exists' });
  }
  const user = new User({ username, password });
  await user.save();
  res.json({ success: true, message: 'User registered successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));