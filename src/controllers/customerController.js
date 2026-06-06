const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');

exports.getCustomers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const customers = await Customer.find(filter)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Customer.countDocuments(filter);
    res.json({ success: true, data: customers, pagination: { total, page: Number(page), limit: Number(limit) } });
  } catch (err) {
    next(err);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

    const invoices = await Invoice.find({ customer: req.params.id }).sort({ issueDate: -1 });

    const metrics = await Invoice.aggregate([
      { $match: { customer: customer._id } },
      {
        $group: {
          _id: null,
          totalInvoices: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalTax: { $sum: '$tax' },
          totalBilled: { $sum: '$total' },
          paidCount: { $sum: { $cond: [{ $eq: ['$status', 'Paid'] }, 1, 0] } },
          overdueCount: { $sum: { $cond: [{ $eq: ['$status', 'Overdue'] }, 1, 0] } },
          unpaidCount: { $sum: { $cond: [{ $eq: ['$status', 'Unpaid'] }, 1, 0] } },
          draftCount: { $sum: { $cond: [{ $eq: ['$status', 'Draft'] }, 1, 0] } },
          sentCount: { $sum: { $cond: [{ $eq: ['$status', 'Sent'] }, 1, 0] } },
          voidCount: { $sum: { $cond: [{ $eq: ['$status', 'Void'] }, 1, 0] } },
          outstanding: {
            $sum: {
              $cond: [{ $in: ['$status', ['Unpaid', 'Overdue', 'Sent']] }, '$total', 0],
            },
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        customer,
        invoices,
        metrics: metrics[0] || {
          totalInvoices: 0,
          totalAmount: 0,
          totalTax: 0,
          totalBilled: 0,
          paidCount: 0,
          overdueCount: 0,
          unpaidCount: 0,
          draftCount: 0,
          sentCount: 0,
          voidCount: 0,
          outstanding: 0,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
