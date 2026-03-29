"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const postgres_1 = __importDefault(require("postgres"));
const { DB_USER, DB_PASSWORD, HOST, DB_PORT, DATABASE } = process.env;
if (!DB_USER || !DB_PASSWORD || !HOST || !DB_PORT || !DATABASE) {
    throw new Error('Missing required environment variables for database connection');
}
const pg = (0, postgres_1.default)(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`);
exports.default = pg;
//# sourceMappingURL=database.js.map