const express = require("express");
const cors = require("cors");
const app = express();
const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    password: "123857496",
    host: "2401:4900:1cb4:3601:a90b:1bfb:d362:630a",
    port: 5432,
    database: "NGIT"
})
// const pool = require("./postgreSQL");
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.get("/:year/:id", async (req, res) => {
    const dataz = await pool.query(`select exists (SELECT FROM information_schema.tables WHERE table_name = 'studentdetails_${req.params.year}series');`)
    if(dataz.rows[0].exists === false){
        res.json([]);
        return;
    }
    const data1 = await pool.query(`select * from studentdetails_${req.params.year}series where rollnumber = '${req.params.id}';`)
    if(data1.rowCount == 0){
        res.json([]);
        return;
    }
    const data2 = await pool.query(`select distinct on(a.subjectcode) a.subjectcode, b.subjectname, credits, gradepoints, gradesecured, timestamp from regularresults_${req.params.year}series a inner join subjects b on a.subjectcode = b.subjectcode where rollnumber = '${req.params.id}' order by subjectcode, timestamp desc;`);
    var a = 0
    var b = 0
    if(data2.rowCount === 0){
        res.json([]);
        return;
    }
    var temp = data2.rows[0].subjectcode[0]
    var result = []
    
    for(let i=1; i<=data2.rows.length; i++){
        if(i == data2.rows.length || JSON.stringify(data2.rows[i].subjectcode[0]) != JSON.stringify(temp)){
            b=i+0
            result.push(data2.rows.slice(a,b))
            a=b+0
            if(i != data2.rows.length) temp = data2.rows[i].subjectcode[0]
        }
    }
    const data10 = await pool.query(`select distinct on(semester) semester, result, date from results where rollnumber = '${req.params.id}' order by semester, timestamp desc;`)
    res.json([data1.rows, result, data10.rows]); 
})

app.get("/history/:year/:id", async (req, res) => {
    const data = await pool.query(`select a.subjectcode, b.subjectname, credits, gradepoints, gradesecured, timestamp from regularresults_${req.params.year}series a inner join subjects b on a.subjectcode = b.subjectcode where rollnumber = '${req.params.id}' order by timestamp desc, subjectcode`)
    const info = await pool.query(`select timestamp, semester, result, date, attempt from results where rollnumber = '${req.params.id}' order by timestamp desc;`)
    var a = 0
    var b = 0
    var temp = data.rows[0].timestamp
    var result = []
    
    for(let i=1; i<=data.rows.length; i++){
        if(i == data.rows.length || JSON.stringify(data.rows[i].timestamp) != JSON.stringify(temp)){
            b=i+0
            result.push(data.rows.slice(a,b))
            a=b+0
            if(i != data.rows.length) temp = data.rows[i].timestamp
        }
    }

    a = 0
    b = 0
    var temp1 = info.rows[0].timestamp
    var result1 = []

    for(let i=1; i<=info.rows.length; i++){
        if(i == info.rows.length || JSON.stringify(info.rows[i].timestamp) != JSON.stringify(temp1)){
            b=i+0
            result1.push(info.rows.slice(a,b))
            a=b+0
            if(i != info.rows.length) temp1 = info.rows[i].timestamp
        }
    }
    res.json([result, result1]);
})

app.listen(port, () => {
    console.log("Server Started")
})