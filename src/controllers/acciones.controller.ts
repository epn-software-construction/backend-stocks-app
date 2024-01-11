import type { ResultSetHeader } from 'mysql2';
import { pool } from '../database/db';

export const getUserStocks = async (req, res): Promise<void> => {
    const [rows] = await pool.query('Select * from ACCION');
    res.json(rows);
};

export const createAcciones = async (req, res): Promise<void> => {
    const { stockSymbol, stockName, unitPrice, amount, totalPrice } = req.body;

    const date = new Date().toISOString();

    const [rows] = await pool.query(
        'INSERT INTO ACCION (idcartera,stockname, stockSymbol,date,unitPrice,amount,totalPrice) VALUES (1,?,?,?,?,?,?)',
        [stockName, stockSymbol, date, unitPrice, amount, totalPrice],
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
};

export const updateAcciones = (req, res): void => {
    res.send('actualizando');
};

export const deleteAcciones = (req, res): void => {
    res.send('eliminando');
};

export const getAllStocks = async (req, res): Promise<void> => {
    const [rows] = await pool.query('SELECT * FROM STOCK');
    res.json(rows);
};
