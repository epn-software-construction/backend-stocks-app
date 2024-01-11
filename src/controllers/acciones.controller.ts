import type { ResultSetHeader } from 'mysql2';
import { pool } from '../database/db';

export const getUserStocks = async (req, res): Promise<void> => {
    const [rows] = await pool.query('Select * from ACCION');
    res.json(rows);
};

export const createAcciones = async (req, res): Promise<void> => {
    const { nameStock, date, price, amount } = req.body;
    const [rows] = await pool.query(
        'insert into ACCION (idcartera, nombreaccion,fechacompra,precioaccion,cantidad,costototal) ' +
            ' values (1,?,?,?,?,?)',
        [nameStock, date, price, amount, price * amount],
    );

    res.send({
        id: (rows as ResultSetHeader).insertId,
        nameStock,
        date,
        price,
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
