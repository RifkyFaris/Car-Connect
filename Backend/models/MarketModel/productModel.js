const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Tyre',
                'Head Light',
                'Engine Oil',
                'Break Oil',
                'Radiator Coolant',
                'Break Pads',
                'Wiper Blades',
                'Fan Belt',
                'Clutch Plate',
                'Rim',
                'Indicator Light',
                'Break Light',
                'Gear Oil',
                'Horn'
            ],
            message : "Please select correct category"
        },
        
    },
    stock: {
        type: Number,
        required: true,
    },
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema