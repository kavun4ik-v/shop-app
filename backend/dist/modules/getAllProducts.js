"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const getAllProducts = async (req, res) => {
    try {
        // If shopId is provided, validate it's a valid number
        if (req.query.shopId && isNaN(Number(req.query.shopId))) {
            res.status(400).json({ error: 'shopId must be a valid number' });
            return;
        }
        const shopId = req.query.shopId ? Number(req.query.shopId) : null;
        let products;
        if (shopId !== null) {
            products = await (0, database_1.default) `
        select * from products
        where shop_id = ${shopId}
      `;
        }
        else {
            products = await (0, database_1.default) `select * from products`;
        }
        res.json(products);
    }
    catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Error fetching products' });
    }
};
exports.default = getAllProducts;
//# sourceMappingURL=getAllProducts.js.map