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

import axios from 'axios';

interface StockData {
    stockSymbol: string;
    stockName: string;
    date: string;
    unitPrice: number;
    totalPrice: number;
    amount: number;
}



export const getAllStocks = async (req, res): Promise<void> => {
    try {
        // Array para almacenar los datos formateados de las acciones
        const formattedStocks: StockData[] = [];

        // Lista de símbolos de acciones
        const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NFLX', 'NVDA', 'AMD', 'PYPL'];

        // Clave de la API de Alpha Vantage
        const apiKey = 'OK2YH8XDJCOPS4Z4';

        // Iterar sobre los símbolos de acciones y obtener la información de la API de Alpha Vantage
        for (const symbol of stockSymbols) {
            // Realizar solicitud a la API de Alpha Vantage para obtener información actualizada de la acción
            const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`, {
                timeout: 10000 // Tiempo de espera en milisegundos (10 segundos en este caso)
            });

            // Extraer la información de interés de la respuesta de la API
            const { '01. symbol': stockSymbol, '05. price': unitPrice } = response.data['Global Quote'];

            // Agregar los datos formateados al array
            formattedStocks.push({
                stockSymbol,
                stockName: '', // Asigna un valor predeterminado o vacío
                date: new Date().toISOString(), // Asigna la fecha actual
                unitPrice: parseFloat(unitPrice), // Convierte el precio a tipo numérico
                totalPrice: 0, // Asigna un valor predeterminado
                amount: 0, // Asigna un valor predeterminado
            });

        }

        // Responder con los datos formateados
        res.json(formattedStocks);
    } catch (error) {
        console.error('Error al obtener las acciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las acciones del usuario' });
    }
};

