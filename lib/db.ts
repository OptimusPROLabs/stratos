import fs from 'fs';
import path from 'path';

export interface WaitlistUser {
  id: string;
  name: string;
  email: string;
  role: string;
  answer?: string;
  players?: Array<{ name: string; email: string }>;
  waitlistNumber: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'waitlist.json');

// Initialize data directory if it doesn't exist
const initDb = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], nextNumber: 1 }, null, 2));
  }
};

export const getWaitlistUsers = (): WaitlistUser[] => {
  initDb();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  return data.users.sort((a: WaitlistUser, b: WaitlistUser) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const addWaitlistUser = (userData: Omit<WaitlistUser, 'id' | 'createdAt' | 'waitlistNumber'>): WaitlistUser => {
  initDb();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  
  const user: WaitlistUser = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    waitlistNumber: data.nextNumber,
    ...userData,
  };
  
  data.users.push(user);
  data.nextNumber += 1;
  
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  
  return user;
};

export const getWaitlistNumber = (): number => {
  initDb();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  return data.nextNumber;
};

export const getUserByEmail = (email: string): WaitlistUser | null => {
  initDb();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  return data.users.find((user: WaitlistUser) => user.email === email) || null;
};
