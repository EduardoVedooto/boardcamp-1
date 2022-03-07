import db from "../db.js";

export async function getCustomers(req, res) {
  if (req.query.cpf) {
    const result = await db.query("SELECT * FROM customers WHERE cpf LIKE $1",[req.query.cpf + "%"]);
    res.send(result.rows);
  }
  const result = await db.query("SELECT * FROM customers");
  res.send(result.rows);
}

export async function getIdCustomers(req, res) {
  const result = await db.query("SELECT * FROM customers WHERE id=$1", [req.params.id]);
  if(!result.rows[0]){
      return res.sendStatus(404)
  }
  res.send(result.rows[0]);
}

export async function postCustomers(req, res){
  const {name, phone, cpf, birthday} = req.body

  verifyData(phone,birthday,res,cpf);
  await db.query(
  `INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ( $1,  $2,  $3,  $4)`),[name,phone,cpf,birthday,]
  res.send(201)
}

export async function putCustomers(req, res){
  const {name, phone, cpf, birthday} = req.body;
  verifyData(phone,birthday,res,cpf);

  await db.query(
      `UPDATE customers 
      SET name=$1, phone=$2, cpf=$3, birthday=$4
        WHERE id=$5`, [name,phone,cpf,birthday, req.params.id])   
  res.sendStatus(200);
}

async function  verifyData(phone,birthday,res,cpf){
  try{
    if (phone.length<10 || phone.length>11){
      return res.sendStatus(422);
     }
     const isValidDate = Date.parse(birthday);
     if(isNaN(isValidDate)){
       return res.sendStatus(400);
     }
   
     const existingUser = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);
     if(existingUser){
       return res.sendStatus(409);
     }
  }catch(err){
    console.log(err);
  }

}