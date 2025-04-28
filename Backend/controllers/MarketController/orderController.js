const Order = require("../../models//MarketModel/orderModel.js");
const Product = require("../../models/MarketModel/productModel.js");

exports.newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const product = await Product.findById(orderItem.product);
    if (product) {
      product.stock = product.stock - orderItem.quantity;
      await product.save();
    }
  }
  res.status(200).json({
    success: true,
    order,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.orders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order has been already delivered!", 400));
  }
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    successs: true,
  });
};

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
};



exports.getSupplierOrders = async (req, res) => {
  try {
    const supplierId = req.user.id; // Supplier must be logged in

    // Fetch all orders and populate product details
    const orders = await Order.find().populate({
      path: "orderItems.product",
      select: "name price user",
    });

    // Filter only the products that belong to the logged-in supplier
    const supplierOrders = orders
      .map((order) => ({
        _id: order._id,
        shippingInfo: order.shippingInfo,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        orderItems: order.orderItems.filter(
          (item) => item.product && item.product.user.toString() === supplierId
        ),
      }))
      .filter((order) => order.orderItems.length > 0); // Only keep orders that have supplier's products

    res.status(200).json({
      success: true,
      orders: supplierOrders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


