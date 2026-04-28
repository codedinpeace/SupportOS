const app = require('./src/app')

const PORT = 8000

app.listen(8000, ()=>{
    console.log(`App running on ${PORT}\nURL: http://localhost:8000`);
})