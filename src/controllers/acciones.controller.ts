import axios from 'axios';
import type { ResultSetHeader } from 'mysql2';
import { pool } from '../database/db';

interface StockData {
    stockSymbol: string;
    stockName: string;
    date: string;
    unitPrice: number;
    totalPrice: number;
    amount: number;
}

export const getUserStocks = async (req, res): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM ACCION');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las acciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las acciones del usuario' });
    }
};

export const createAcciones = async (req, res): Promise<void> => {
    try {
        const { stockSymbol, stockName, unitPrice, amount, totalPrice } = req.body;
        const date = new Date().toISOString();

        const [rows] = await pool.query(
            'INSERT INTO ACCION (idcartera, stockname, stockSymbol, date, unitPrice, amount, totalPrice) VALUES (1, ?, ?, ?, ?, ?, ?)',
            [stockName, stockSymbol, date, unitPrice, amount, totalPrice]
        );

        res.send({
            id: (rows as ResultSetHeader).insertId,
            stockSymbol,
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
        const formattedStocks: StockData[] = [];
        const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'INTC', 'TSLA', 'NFLX', 'NVDA'];
        const apiKey = '291b8c72d29549b5bf9f3fdc7cca19af';

        for (const symbol of stockSymbols) {
            const response = await axios.get(`https://api.twelvedata.com/time_series?apikey=${apiKey}&interval=1min&symbol=${symbol}`);

            if (response.data && response.data.values && response.data.values.length > 0) {
                const { meta, values } = response.data;
                const stockSymbol = meta.symbol;
                const stockName = meta.symbol;
                const date = values[0].datetime;
                const unitPrice = parseFloat(values[0].close);

                formattedStocks.push({
                    stockSymbol,
                    stockName,
                    date,
                    unitPrice,
                    totalPrice: 0,
                    amount: 0,
                });
            } else {
                console.error('La respuesta de la API no contiene datos válidos');
            }
        }

        res.json(formattedStocks);
    } catch (error) {
        console.error('Error al obtener las acciones:', error);
        res.status(500).json({ error: 'Error al obtener las acciones' });
    }
};
