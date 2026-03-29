import { Request, Response } from 'express';
interface GetProductsRequest extends Request {
    query: {
        shopId?: string;
    };
}
declare const getAllProducts: (req: GetProductsRequest, res: Response) => Promise<void>;
export default getAllProducts;
//# sourceMappingURL=getAllProducts.d.ts.map