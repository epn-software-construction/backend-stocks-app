import axios from 'axios';
import type { ResultSetHeader } from 'mysql2';
import { pool } from '../database/db';

interface StockData {
    id: number;
    stockSymbol: string;
    stockName: string;
    date: string;
    unitPrice: number;
    totalPrice: number;
    amount: number;
}

interface Stock {
    id: number;
    name: string;
    symbol: string;
    price: number;
}
export const getUserStocks = async (req, res): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM ACCION');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (rows as ResultSetHeader[]).map((stock: any) => ({
            stockName: stock.NOMBREACCION,
            date: stock.FECHACOMPRA,
            unitPrice: stock.PRECIOACCION,
            totalPrice: stock.COSTOTOTAL,
            amount: stock.CANTIDAD,
        }));

        res.json(data);
    } catch (error) {
        console.error('Error al obtener las acciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las acciones del usuario' });
    }
};

export const createAcciones = async (req, res): Promise<void> => {
    try {
        const { stockName, unitPrice, amount, totalPrice, date } = req.body;

        const [rows] = await pool.query(
            'insert into ACCION (IDCARTERA, NOMBREACCION,FECHACOMPRA,PRECIOACCION,CANTIDAD,COSTOTOTAL) VALUES (1, ?, ?, ?, ?, ?)',
            [stockName, date, unitPrice, amount, totalPrice],
        );

        res.send({
            id: (rows as ResultSetHeader).insertId,
            stockName,
            date,
            unitPrice,
            totalPrice,
            amount,
        });
    } catch (error) {
        console.error('Error al crear la acción:', error);
        res.status(500).json({ error: 'Error al crear la acción' });
    }
};

export const updateAcciones = (req, res): void => {
    res.send('actualizando');
};

export const deleteAcciones = (req, res): void => {
    res.send('eliminando');
};

export const getAllStocks = async (req, res): Promise<void> => {
    try {
        /* const formattedStocks: Stock[] = [];
         const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'INTC', 'TSLA', 'NFLX', 'NVDA'];
         const apiKey = '291b8c72d29549b5bf9f3fdc7cca19af';
 
         for (const symbol of stockSymbols) {
             const response = await axios.get(`https://api.twelvedata.com/time_series?apikey=${apiKey}&interval=1min&symbol=${symbol}`);
             console.log(response);
             const { meta, values } = response.data;
             const id = 0;
             const stockSymbol = symbol;
             const stockName = symbol;
             const date = values[0].datetime;
             const unitPrice = parseFloat(values[0].close);
 
             formattedStocks.push({
                 id,
                 name: stockName,
                 symbol,
                 price: unitPrice
             });
 
 
         } */

        const stocks = [
            { id: 0, name: 'AAPL', symbol: 'AAPL', price: 170.17 },
            { id: 0, name: 'MSFT', symbol: 'MSFT', price: 402.85001 },
            { id: 0, name: 'GOOGL', symbol: 'GOOGL', price: 132.7 },
            { id: 0, name: 'AMZN', symbol: 'AMZN', price: 174.13 },
            { id: 0, name: 'INTC', symbol: 'INTC', price: 43.19 },
            { id: 0, name: 'TSLA', symbol: 'TSLA', price: 180.8 },
            { id: 0, name: 'NFLX', symbol: 'NFLX', price: 598.62 },
            { id: 0, name: 'NVDA', symbol: 'NVDA', price: 859.94 },
        ];

        res.json(stocks);
    } catch (error) {
        console.error('Error al obtener las acciones:', error);
        res.status(500).json({ error: 'Error al obtener las acciones' });
    }
};
