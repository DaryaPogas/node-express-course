//console.log('Express Tutorial')
const express = require('express')
const app = express()
const { products } = require("./data");

app.use(express.static('./public'))

app.get('/api/v1/test', (req,res) =>{
    //res.json({message: 'It worked'})
    res.json(products)
})

app.get('/api/v1/products/:productID', (req,res) =>{
    console.log(req.params)
    const productID = parseInt(req.params.productID)

    if(isNaN(productID)){
        return res.status(404).json({
            message: ' that product was not found'
        })
    }
    const singleProduct = products.find((product) => product.id === productID)

    if(!singleProduct){
        return res.status(404).send('Product not found')
    }
    res.json(singleProduct)
})

app.get('/api/v1/query', (req,res) =>{
    const {search, limit, maxPrice} = req.query;
    let sortedProducts = [...products]

    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit)) 
    }
    if(maxPrice){
        const maxPriceFloat = parseFloat(maxPrice);
         if (isNaN(maxPriceFloat)) {
           return res.status(404).json({
             message: " invalid price value",
           });
         }
       sortedProducts = sortedProducts.filter(product => product.price <= maxPriceFloat)
    }
    res.status(200).json(sortedProducts)
    
})



app.all("*", (req, res) => {
  res.status(404).send("page not found");
}); 

app.listen(3000, () =>{
    console.log('server is listening on port 3000...')
})