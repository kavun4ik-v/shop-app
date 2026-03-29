import { Request, Response } from 'express';
import pg from './database';

interface Product {
  id: number;
  name: string;
  price: number;
  shop_id: number;
}

interface GetProductsRequest extends Request {
  query: {
    shopId?: string;
  };
}

const getAllProducts = async (req: GetProductsRequest, res: Response): Promise<void> => {
  try {
    // If shopId is provided, validate it's a valid number
    if (req.query.shopId && isNaN(Number(req.query.shopId))) {
      res.status(400).json({ error: 'shopId must be a valid number' });
      return;
    }

    const shopId: number | null = req.query.shopId ? Number(req.query.shopId) : null;
    
    let products: Product[];
    if (shopId !== null) {
      products = await pg`
        select * from products
        where shop_id = ${shopId}
      `;
    } else {
      products = await pg`select * from products`;
    }
    
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export default getAllProducts;
