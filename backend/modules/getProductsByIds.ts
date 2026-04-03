import { Request, Response } from 'express';
import pg from './database';

interface Product {
  id: number;
  name: string;
  price: number;
  shop_id: number;
}

const getProductsByIds = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const ids = req.body.ids.map(Number);

    const productsInCart = await pg<Product[]>`
      select * from products 
      where id = ANY(${ids})
    `;

    res.json(productsInCart);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export default getProductsByIds;