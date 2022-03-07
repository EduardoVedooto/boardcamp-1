import db from "../db.js";

export async function getCategory (req,res){
    const result = await db.query('SELECT * FROM categories');
    res.send(result.rows)
}

export async function postCategory (req,res){
    const { name } = req.body;


    const verifyName = await db.query(
    'SELECT * FROM categories WHERE name=$1',[name]
    );

    if (verifyName.rows[0]) {
        return res.sendStatus(409);
    }

    
    await db.query('INSERT INTO categories (name) VALUES ($1)',[name]);

    res.sendStatus(201)
}