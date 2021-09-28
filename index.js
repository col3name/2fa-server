const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5001

let app = express();
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/hello', (req, res) => {
    res.render('pages/index')
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
