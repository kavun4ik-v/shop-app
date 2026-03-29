-- Create tables for the shopping app

-- Shops table
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Insert sample data
INSERT INTO shops (name, rating) VALUES
('Tech Store', 4.5),
('Grocery Mart', 4.2),
('Fashion Hub', 4.8)
ON CONFLICT DO NOTHING;

INSERT INTO products (name, price, shop_id) VALUES
('Laptop', 999.99, 1),
('Mouse', 25.50, 1),
('Keyboard', 75.00, 1),
('Apple', 2.50, 2),
('Banana', 1.20, 2),
('Milk', 3.00, 2),
('T-Shirt', 15.99, 3),
('Jeans', 49.99, 3),
('Sneakers', 89.99, 3)
ON CONFLICT DO NOTHING;