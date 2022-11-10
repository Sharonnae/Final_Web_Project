const adminView = (req, res) => {
    res.render('admin', {});
}

const productView = (req, res) => {
    res.render('products', {});
}

const addProduct = (req, res) => {
    console.log('productDetail', req.body);
    res.send(req.body);
}

const uploadFiles = (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];
            console.log('r', req.files.files)

            for(let i = 0; i < 4; i ++) {
                let image = req.files.files[i];
                let img_name = Date.now() + image.name;

                image.mv('./public/asset/images/' + img_name);

                data.push({
                    name: img_name,
                    mimetype: image.mimetype,
                    size: image.size
                })
            }

            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            })

            // _.forEach(_.keysIn(req.files.))
        }
    }  catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    adminView,
    productView,
    addProduct,
    uploadFiles
}