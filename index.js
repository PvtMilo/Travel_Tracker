import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const { Client } = pg;

const app = express();
const port = 3000;

const db = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "world",
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    const result = await db.query("SELECT * FROM visited_countries");
    // console.log(result.rows);
    let newArr = [];
    result.rows.forEach((value) => {
      newArr.push(value.country_code);
    });
    res.render("index.ejs", { total: newArr.length, countries: newArr });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const userInput = req.body.country.trim();
  const result = await db.query(
    `SELECT country_code, country_name FROM countries WHERE country_name='zim'`,
  );

  console.log(result.rows.length)

  const visitedCountryData = await db.query("SELECT * FROM visited_countries");
  let newArr = []
  visitedCountryData.rows.forEach((value) => {
    newArr.push(value.country_code)
  })

  if(result.rows.length > 0){
    const grabCode = result.rows[0].country_code;
    if (newArr.includes(grabCode)) {
      console.log("data already exist")
    } else {
      console.log("data added")
    }

  }else{
    console.log("data not found!")
  }

  try {

  } catch (error) {
    console.log("error /add try catch");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
