import express from 'express';

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello ekata pala")
});

app.get('/hello', (req, res) => {
    res.send("Hello Hto")
});

app.listen(PORT, () => {
    console.log("App is listening in PORT 3000")
});