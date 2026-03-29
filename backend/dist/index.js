"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllProducts_1 = __importDefault(require("./modules/getAllProducts"));
const createOrder_1 = __importDefault(require("./modules/createOrder"));
const getAllShops_1 = __importDefault(require("./modules/getAllShops"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./modules/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/products', async (req, res) => {
    await (0, getAllProducts_1.default)(req, res);
});
app.get('/shops', async (req, res) => {
    await (0, getAllShops_1.default)(req, res);
});
app.post('/orders', async (req, res) => {
    await (0, createOrder_1.default)(req, res);
});
app.get('/db-check', async (req, res) => {
    try {
        const tables = await (0, database_1.default) `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('shops', 'products', 'orders', 'order_items')
    `;
        res.json({ tables: tables.map(t => t.table_name) });
    }
    catch (err) {
        console.error('DB check error:', err);
        res.status(500).json({ error: 'DB connection failed' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🔥 MY SERVER STARTED on port ${PORT}`);
});
console.log("🔥 INDEX FILE RUNNING");
//# sourceMappingURL=index.js.map