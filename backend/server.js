const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/teamdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  aboutProject: { type: String, default: '' },
  hobbies: { type: String, default: '' },
  certificate: { type: String, default: '' },
  internship: { type: String, default: '' },
  aboutYourAim: { type: String, default: '' },
  email: { type: String, default: '' },
  role: { type: String, default: 'Member' },
  image: { type: String, default: '' },
  __v: { type: Number, default: 0 }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ─────────────────────────────────────────────
// API ROUTES
// ─────────────────────────────────────────────

// POST /members — Add a new team member
app.post('/members', upload.single('image'), async (req, res) => {
  try {
    const { name, roll, year, degree, aboutProject, hobbies, certificate, internship, aboutYourAim, email, role } = req.body;

    if (!name || !roll || !year || !degree) {
      return res.status(400).json({ error: 'Name, Roll Number, Year and Degree are required.' });
    }

    const member = new Member({
      name,
      roll,
      year,
      degree,
      aboutProject: aboutProject || '',
      hobbies: hobbies || '',
      certificate: certificate || '',
      internship: internship || '',
      aboutYourAim: aboutYourAim || '',
      email: email || '',
      role: role || 'Member',
      image: req.file ? req.file.filename : ''
    });

    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// GET /members — Retrieve all team members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members/:id — Retrieve a single member by ID
app.get('/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Also expose at /api/members and /api/members/:id for browser testing
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /members/:id — Delete a member
app.delete('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    // Remove image file if exists
    if (member.image) {
      const imgPath = path.join(__dirname, 'uploads', member.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 API: http://localhost:${PORT}/api/members`);
});
