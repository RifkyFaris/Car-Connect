// backend/models/stripe.js
const Stripe =require('stripe') ;


const stripe = new Stripe('sk_test_51RGhSzFNC9lumuodSM9OScNcvhnCAEVf6SL4Ysi9xq04dhnrPFqkt72YnhVSOUKwJne2N2mQstxdbW0sdopQ66xM00Plw8XaqC');

module.exports=stripe;