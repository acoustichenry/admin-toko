exports.listProducts = (req, res) => {
    // example data
    fetch('http://localhost:2727/api/v1/products/get-product')
        .then(response => response.json())
        .then(data => {
            res.render('pages/products', {
                title: "Product List",
                products: data.data
            });
        });
};


exports.addProducts = (req, res) => {
    res.render('pages/addProducts',{
        title: "Add Produk"
    })
}

exports.editProducts = (req, res) => {
    res.render('pages/editProducts', {
        title: "Edit Products "
    })
    
}
