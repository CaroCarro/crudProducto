const {product_model} = require('../models');//Los corchetes son para no importar todo

//Funcion que retornará el listado de productos que tenemos en la base de datos
addProduct = (req, res) => {//Creamos la función que recibe un requerimiento y una respuesta
    const product_new = new product_model(req.body);
    product_new.save((error, product) => {
        if(error) return res.status(500).json({error: true, mensaje: error})
        res.json({mensaje: req.body.description + " agregado satisfactoriamente"})
    })
}

getAllProducts = (req, res) => {
    product_model.find().exec((error, products) => {//Se le dice a Mongoose que nos devuelva todos los datos. Me puede devolver un error o los productos.
        if(error) return res.status(500).json({error: true, mensaje: error});
        res.json({products});
    });
}

deleteProduct = async (req, res) => {//Funcion asincrona: es como para garantizar que se haga. Tengo esperar que se cumpla
    const product_delete = await product_model.findByIdAndDelete({_id : req.params.id})

    try{
        if(product_delete) return res.json({mensaje: product_delete.description + " eliminado correctamente" });
        else return res.status(500).json({error: true, mensaje: "Falla al eliminar"});
    }catch(error){
        return res.status(500).json({error: true, mensaje: error})
    }
}

updateProduct = async(req, res) => {
    try{
        const product_update = await product_model.findByIdAndUpdate({_id: req.body._id}, req.body, {useFindAndModify: false});
        if(product_update) return res.json({mensaje: "Producto actualizado correctamente"});
        else return res.status(400).json({error: true, mensaje: "Falla al actualizar"})
    }catch(error){
        if(error) return res.status(500).json({error: true, mensaje: error})
        }
}




module.exports = Object.freeze({//Con esto exportamos la función
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
});