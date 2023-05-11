const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//


//create a todo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("insert into todo (description) values ($1) returning *", [description]);
        // const newTodo = await pool.query(`insert into todo (description) values ${description} returning *`);
        res.json(newTodo);
    } catch (err) {
        console.error(err);
    }
})

//get all todo's
app.get("/todos", async (req, res) => {
    try {
        const newTodo = await pool.query("select todo_id, description from todo");
        res.json(newTodo.rows);
    } catch (err) {
        console.error(err);
    }
})


//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const newTodo = await pool.query("select todo_id, description from todo where todo_id = $1", [id]);
        res.json(newTodo);
    } catch (err) {
        console.error(err);
    }
})


//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const newTodo = await pool.query("update todo set description = $1 where todo_id = $2 returning *", [description, id]);
        res.json(newTodo);
    } catch (err) {
        console.error(err);
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const newTodo = await pool.query("delete from todo where todo_id = $1", [id]);
        res.json(newTodo);
    } catch (err) {
        console.log(err);
    }
})


app.listen(5000, () => {
    console.log("Sever has started on post 5000");
});