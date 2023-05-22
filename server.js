import express from 'express'
import path from 'path'
import { Main,flush } from './codeRunner.js'

const app = express()

/**
 * Variables
 */

const PORT = process.env.PORT || 7575


/**
 * Express uses
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

/**
 * Routes
 */
app.get("/",(req,res)=>{
    flush()
    res.sendFile(path.join(process.cwd(),'index.html'))
})

app.get("/web",(req,res)=>{
    res.sendFile(path.join(process.cwd(),"web.html"))
})

app.post('/compile',(req,res)=>{
    const {code,lang,input} = req.body

    const output = Main(lang,code)

    res.json({
        output:output
    })
})

app.listen(PORT, () => {
    console.log("SERVER STARTED...")
})