exports.createPurchasing = (req, res) => {
    res.render('pages/createPurchasing', {
        title: 'create purchasing'
    })
}

exports.submitPurchasing = async (req, res) => {
    try {
        const { id_produk, jumlah, harga_beli } = req.body;

        // SEND POST request to your API endpoint
        const response = await fetch('http://localhost:2727/api/v1/purchasing/create-purchasing', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_produk,
                jumlah,
                harga_beli
            })
        });

        const result = await response.json();

        console.log("API RESULT:", result);

        // After success, redirect to list page
        res.redirect('/products/list');

    } catch (error) {
        console.error(error);
        res.status(500).send("Error submitting purchasing");
    }
};
