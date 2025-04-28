const Product = require('../../models/MarketModel/productModel.js');
const APIFeatures=require("../../utils/MarketUtils/apiFeatures.js");

//new prpduct
exports.newProduct=async(req,res,next)=>{
    let images = []
    let BASE_URL = process.env.BACKEND_URL;    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/MarketUploads/Product/${file.originalname}`;
            images.push({ image: url })
        })
    }
    req.body.images = images;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

//get single product
exports.getSingleProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(201).json({
        success:true,
        product
    })
}

//update product
exports.updateProducts=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    
    let images = []
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/MarketUploads/Product/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })
}

//delete product
exports.deleteProduct=async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    await Product.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
    })
}

//admin get all products
exports.getAdminProducts=async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
   
}

//filter & search product
exports.getProducts=async(req,res,next)=>{
   
    let buildQuery=()=>{
        return new APIFeatures(Product.find(),req.query).search().filter()
    }
    const products=await buildQuery().query
    
    let filteredProductsCount=products.length;

    res.status(200).json({
        success : true,
        count:filteredProductsCount,
        products
    })
}

//supplier get all products
exports.getSupplierProducts=async(req,res,next)=>{
    const products = await Product.find({user:req.user.id});
    res.status(200).send({
        success: true,
        products
    })
   
}
