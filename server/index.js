

const express = require('express')
const app = express()

const mysql =require('mysql')

const cors =require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
res.send('Hello World!')
})



const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"codding"
})

app.post('/create', (req, res) => {
    fname=req.body.fname
    lname=req.body.lname
    adhar=req.body.adhar
    mobile=req.body.mobile
  

    db.query('insert into employee(fname,lname,adhar,mobile) values(?,?,?,?)',
    [fname,lname,adhar,mobile],(err,result)=>
    {
        if(err)
        {
            console.log("error:"+err)
        }
        else{
            res.send("data inserted succesfully")
        }
    })
})


//get datat from database
app.get('/recieve',(req,resp) => {
db.query("select * from employee",(err,result)=>
{
    if(err){
console.log("access error"+err)
    }else{
 var a=resp.send(result)
 console.log(a)
    }
})
})


//delete data from database 
app.delete('/delete/:id',(req,resp)=>
{
const id=req.params.id;

db.query("delete from employee where id=?",id,(err,result)=>
{
    if(err)
    {
        console.log(err)
    }else{
        resp.send(result)
    }
})
})





app.listen(3001, () => {
console.log(`Example app listening at http://localhost:3001`)
})