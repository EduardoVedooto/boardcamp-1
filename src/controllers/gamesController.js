import db from "../database.js";

export async function getGame(req, res) {
  if (req.query.name) {
    const games = await db.query(`SELECT * FROM games WHERE name LIKE $1`,[req.query.name+'%']);
    res.send(games.rows);
  }else{
    const games = await db.query(
      `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories
        ON games."categoryId"=categories.id`);
    res.send(games.rows);
  }
}

export async function postGame(req, res) {
  const {name, image, stockTotal, categoryId, pricePerDay} = req.body

  if (parseFloat(stockTotal) <= 0 || parseFloat(pricePerDay) <= 0) {
    return res.sendStatus(400)
  }

  const verifyName = await db.query(
    'SELECT * FROM games WHERE name=$1',[name]
  );

  if (verifyName.rows[0]) {
    return res.sendStatus(409)
  }

  const verifyiId = await db.query(
    'SELECT * FROM categories WHERE id=$1',[categoryId]
  );

  if (!verifyiId.rows[0]) {
    return res.sendStatus(409)
  }

  await db.query(
    `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ('${name}','${image}',${parseFloat(stockTotal)},${categoryId},${parseFloat(pricePerDay)})`
  );

  res.sendStatus(201);
}