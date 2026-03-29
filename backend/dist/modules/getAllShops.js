"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const getAllShops = async (req, res) => {
    console.log("🔥 getAllShops called");
    try {
        // let shops = [{ id: 1, name: "Test Shop", rating: 5 }];
        let shops = await (0, database_1.default) `select * from shops`;
        res.json(shops);
    }
    catch (err) {
        console.error('Error fetching shops:', err);
        res.status(500).json({ error: 'Error fetching shops' });
    }
};
exports.default = getAllShops;
//# sourceMappingURL=getAllShops.js.map