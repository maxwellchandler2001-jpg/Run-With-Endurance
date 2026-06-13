import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Store emails in a simple JSON file
const DATA_DIR = join(__dirname, 'data');
const EMAILS_FILE = join(DATA_DIR, 'subscribers.json');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}
if (!existsSync(EMAILS_FILE)) {
  writeFileSync(EMAILS_FILE, '[]');
}

// POST /api/subscribe - capture email
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const subscribers = JSON.parse(readFileSync(EMAILS_FILE, 'utf-8'));

  if (subscribers.some((s) => s.email === email)) {
    return res.status(409).json({ error: 'This email is already subscribed.' });
  }

  subscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
  });

  writeFileSync(EMAILS_FILE, JSON.stringify(subscribers, null, 2));

  res.json({ success: true, message: 'Welcome to Run with Endurance! Check your inbox for a confirmation.' });
});

// GET /api/subscribers - (admin) list subscriber count
app.get('/api/subscribers', (_req, res) => {
  const subscribers = JSON.parse(readFileSync(EMAILS_FILE, 'utf-8'));
  res.json({ count: subscribers.length, subscribers });
});

const PORT = 8001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`📬 Email API server running on http://127.0.0.1:${PORT}`);
});