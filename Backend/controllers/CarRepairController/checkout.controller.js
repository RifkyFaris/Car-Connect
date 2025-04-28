const stripe =require('../../models/CarRepairModel/stripe');
 
const YOUR_DOMAIN = 'http://localhost:5173';
 
exports.createCheckoutSession = async (req, res) => {
  try {
    const { service, price, email } = req.body.bookingDetails;
 
   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/checkout`,
      customer_email: email,
    });
 
 
    res.send({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
};
 
 
 
 
exports.getSessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.send({
      status: session.payment_status, // Can be 'paid' or 'unpaid'
      customer_email: session.customer_email,
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
 
 