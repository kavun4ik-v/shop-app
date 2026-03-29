import { Request, Response } from 'express';
import pg from './database';

interface Shop {
    id: number;
    name: string;
    rating: number;
}

const getAllShops = async (req: Request, res: Response): Promise<void> => {
    console.log("🔥 getAllShops called");

    try {
       // let shops = [{ id: 1, name: "Test Shop", rating: 5 }];
        let shops = await pg<Shop[]>`select * from shops`;
        res.json(shops);
    } catch (err) {
        console.error('Error fetching shops:', err);
        res.status(500).json({ error: 'Error fetching shops' });
    }
};

export default getAllShops;