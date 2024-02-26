const express = require('express');
const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'db'
}

const mysql = require('mysql2');

// 

app.get('/inserir/:name', async (req, res) => {
    const connected = mysql.createConnection(config);

    const sql = `INSERT INTO people(name) VALUES ('${req.params['name']}')`;
    connected.query(sql);
    connected.end();
    res.send(`People ${req.params['name']},criado com sucesso! `)
})


app.get('/', async (req, res) =>  {

    try {
        let con = mysql.createConnection(config);
        let query = `SELECT * FROM people;`
        con.query(query, 
            function (err, results, fields) {
                
                let list = '\n';
                results.forEach(row => {
                    list += `<li>${row['name']}</li>\n`
                })

                console.log(list);
                
                res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`);
                
            });
        con.end();

        
    } catch (error) {
        console.log(error);
        res.send(`<h1>Full Cycle Rocks!</h1>\n <p>${error}</p>`);
        
    }

    
});


app.listen(3000, () => console.log('Server is running...'))