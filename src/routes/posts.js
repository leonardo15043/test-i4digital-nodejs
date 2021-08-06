const Router = require("express");
const router = Router();
const fetch = require('node-fetch');

const xl = require('excel4node');
const logger = require("../utils/logger");
let datalog = require("../logs/log-api.log");

// Listar publicaciones.

router.get('/', async (req,res)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    res.json(posts);
});

// Editar registro de una petición.

router.put('/:id/', async (req,res)=>{
    const body = req.body;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+req.params.id, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const post = await response.json();
    res.json(post);
});

// Eliminar registro de una petición.

router.delete('/:id/', async (req,res)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+req.params.id, {
        method: 'DELETE'
    });
    const post = await response.json();
    res.json(post);
    logger.info("Usuario eliminado",res);
});

// Listar Registros de peticiones realizadas. 

router.get('/logs', async (req,res)=>{
    const log = JSON.stringify(datalog);
    res.json(log);
});

// Exportar registros en base64

router.get('/export', async (req,res)=>{

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Worksheet Name');

    const data = [req.body];

    const headingColumnNames = [
        "id",
        "title",
        "body",
        "userId"
    ]

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });

    let rowIndex = 2;
    data.forEach( record => {
        let columnIndex = 1;
        Object.keys(record ).forEach(columnName =>{
            ws.cell(rowIndex,columnIndex++)
                .string(record [columnName])
        });
        rowIndex++;
    });


    wb.writeToBuffer().then(function(buffer) {
       let buff = new Buffer.from(buffer);
       let base64data = buff.toString('base64');
        res.json({'base64': base64data});
    });

    logger.info("Post exportado",base64data);

});



module.exports = router;