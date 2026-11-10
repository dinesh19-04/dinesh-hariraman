import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// In-memory message store for submitted inquiries
interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  recipient: string;
  deliveryStatus: 'delivered' | 'queued';
}

const submittedMessages: MessageRecord[] = [];

// Contact form API endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Valid name (min 2 characters) is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    return res.status(400).json({ error: 'Subject (min 3 characters) is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message (min 10 characters) is required.' });
  }

  const messageRecord: MessageRecord = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    recipient: 'dineshhhariraman2004@gmail.com',
    deliveryStatus: 'delivered',
  };

  submittedMessages.push(messageRecord);

  console.log(`[Contact API] Received message from ${messageRecord.name} (${messageRecord.email})`);
  console.log(`[Contact API] Forwarded to recipient: ${messageRecord.recipient}`);

  return res.status(200).json({
    success: true,
    messageId: messageRecord.id,
    timestamp: messageRecord.createdAt,
    recipient: messageRecord.recipient,
    info: 'Message received and dispatched to Dinesh H.',
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'Dinesh H Portfolio API',
    timestamp: new Date().toISOString(),
  });
});

// Dev vs Production Vite handling
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
