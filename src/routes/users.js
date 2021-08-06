const Router = require("express");
const router = Router();
const fetch = require('node-fetch');
const _ = require('underscore');

//Listar a los usuarios.

router.get('/', async (req,res)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.json(users);
});

// Consultar fotos de un usuario.

router.get('/:id/photos/', async (req,res)=>{
    const albums = await fetch('https://jsonplaceholder.typicode.com/users/'+req.params.id+'/albums');
    const data = await albums.json();
    _.each(  data, async (album,i)=>{ 
        const photos = await fetch('https://jsonplaceholder.typicode.com/albums/'+album.id+'/photos');
        res.json(await photos.json());
    });
});


module.exports = router;