const nodemailer=require('nodemailer')
const otpStore={}
const User =require('../../models/ProfileModel/userModel.js');
const stripe = require('stripe')("sk_test_51QhOpc4bJzIHZ9lA1o8RnD08eJmV4c2IrpAgX9tHpwRxBsjMchk6waacsPXXnYQle6cGBzPV8E7uIfIWdtqJVKoh00f4Zo9bnN")


    

exports.otp = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const phone = user.phoneNo;

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[phone] = {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000 
        };

        const sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "rifdhi9@gmail.com",
                pass: "pass",
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}`
        };

        sender.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ error: "Failed to send OTP email" });
            } else {
                return res.status(200).json({ message: "OTP sent successfully" });
            }
        });

    } catch (err) {
        console.error("Error in OTP generation:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

        

    


exports.verifyyotp = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const phone = user.phoneNo;
        storedOtp=otpStore[phone]

        if (storedOtp.otp.toString() === otp.toString()) {
            delete otpStore[phone];
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ error: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error verifying OTP:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

exports.processPayment  = async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "lkr",
        description: "PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
}

exports.sendStripeApi  = async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: "pk_test_51QhOpc4bJzIHZ9lAgAQvliN5T4FpxnvWYSD1NNPU27OnbQjA4GxyFMkBU4EnU8BxOPiullLrWuavDOpowsGXkPqc00W8NDESt7"
    })
}