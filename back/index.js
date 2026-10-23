const PORT=4001
const dotenv=requir(dotenv)
dotenv.congig()
const port=process.env.PORT
const express = requir('expess')
const app = express()
app.listen(port,()=>{
console.log("serveur tourn dans le port"+port)
})
app.get
app.get("",(req,res)=>{
res.send("Hello from back")
})
app.get('/user',(req,res)=>{
res.json("voici les user")
})