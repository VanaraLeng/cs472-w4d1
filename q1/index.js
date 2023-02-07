const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    let template = `
        <h3>Add Cookie </h3>
        <form action="/add" method="post"> 
            <input name="key" placeholder="Enter Key">
            <input name="value" placeholder="Enter Value">
            <input type="submit">
        </form>
        <br>
        <table> 
            <tr>
                <th> Key </th>
                <th> Value </th>
            </tr> 
            `;

            for (let key in req.cookies) {
                template += `
                <tr>
                    <td> ${key} </td>
                    <td> ${req.cookies[key]} </td>
                    </td>
                </tr>
                `;
            }

    template += '</table>';
    res.send(template);
})

app.post('/add', (req, res) => {
    let key = req.body.key;
    let value = req.body.value;

    res.cookie(key, value);

    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server is runnning at port 3000");
})