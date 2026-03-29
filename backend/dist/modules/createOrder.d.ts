import { Request, Response } from 'express';
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
declare const createOrder: (req: OrderRequest, res: Response) => Promise<void>;
export default createOrder;
//# sourceMappingURL=createOrder.d.ts.map