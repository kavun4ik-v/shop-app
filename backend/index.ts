import express, { Express, Request, Response } from 'express';
import getAllProducts from './modules/getAllProducts';
import createOrder from './modules/createOrder';
import getAllShops from './modules/getAllShops';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from './modules/database';
  

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.get('/products', async (req: Request, res: Response): Promise<void> => {
  await getAllProducts(req, res);
});

app.get('/shops', async (req: Request, res: Response): Promise<void> => {
  await getAllShops(req, res);
});

app.post('/orders', async (req: Request, res: Response): Promise<void> => {
  await createOrder(req, res);
});


app.get('/db-check', async (req: Request, res: Response): Promise<void> => {
  try {
    const tables = await pg`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('shops', 'products', 'orders', 'order_items')
    `;
    res.json({ tables: tables.map(t => t.table_name) });
  } catch (err) {
    console.error('DB check error:', err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

const PORT: string | number = process.env.PORT || 3001;
app.listen(PORT, (): void => {
  console.log(`🔥 MY SERVER STARTED on port ${PORT}`);
});

console.log("🔥 INDEX FILE RUNNING");

