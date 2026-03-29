import { Request, Response } from 'express';
import pg from './database';
import { timeStamp } from 'node:console';

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  id?: number;
}

interface OrderRequest extends Request {
  body: {
    email: string;
    phone: string;
    address: string;
    shopId: number;
    items: OrderItem[];
  };
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface InsertResult {
  id: number;
}

const createOrder = async (req: OrderRequest, res: Response): Promise<void> => {
  console.log('🔥 createOrder called with body:', req.body);
  try {
    const { email, phone, address, items, shopId } = req.body;

    // 1. Validation
    if (!email || !phone || !address || !items?.length || !shopId) {
      console.log('❌ Validation failed: missing fields');
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!email.includes('@')) {
      console.log('❌ Validation failed: invalid email');
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    if (phone.length < 10) {
      console.log('❌ Validation failed: invalid phone');
      res.status(400).json({ error: "Invalid phone format" });
      return;
    }

    console.log('✅ Validation passed');

    // 2. Normalize incoming item IDs and quantities
    const requestItems = items.map(item => ({
      productId: Number(item.productId ?? item.id),
      quantity: Number(item.quantity),
      name: item.name,
      price: Number(item.price),
    }));

    const productIds = Array.from(new Set(requestItems.map(item => item.productId)));

    console.log('🔍 Fetching products for IDs:', productIds, 'shopId:', shopId);
    const products: Product[] = await pg`
      SELECT id, name, price FROM products WHERE id = ANY(${productIds})
    `;
    console.log('📦 Found products:', products);
    
    // 3. Verify all products exist
    if (products.length !== productIds.length) {
      console.log('❌ Product verification failed: expected', productIds.length, 'got', products.length);
      res.status(400).json({ error: "Some products not found" });
      return;
    }

    console.log('✅ All products verified');

    // 4. Build order items with name, price, quantity
    const productMap = new Map(products.map(p => [p.id, p]));

    const orderItems = requestItems.map(item => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found in shop ${shopId}`);
      }

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };
    });

    console.log('🛒 Order items:', orderItems);

    // 5. Calculate total
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('💰 Total calculated:', total);
    
    // 6. Create order in DB
    let orderId!: number;

    console.log('💾 Starting transaction');
    await pg.begin(async (tx: any) => {
    const order = await tx`
      INSERT INTO orders (email, phone, address, created_at, total)
      VALUES (${email}, ${phone}, ${address}, NOW(), ${total})
      RETURNING id
    `;

    orderId = order[0].id;
    console.log('📝 Order inserted with ID:', orderId);

    // 7. Create order items in DB
    for (const item of orderItems) {
      await tx`
        INSERT INTO order_items (order_id, product_id, quantity, name, price)
        VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.name}, ${item.price})
        `;
      }
    console.log('📦 Order items inserted');
    });
    console.log('✅ Transaction completed');
    res.json({ orderId });
    
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ error: 'Error creating order' });
  }
};

export default createOrder;
