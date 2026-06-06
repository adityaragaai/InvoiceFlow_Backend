const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

exports.getSummary = async (req, res, next) => {
  try {
    const [invoiceStats, customerCount] = await Promise.all([
      Invoice.aggregate([
        {
          $group: {
            _id: null,
            totalInvoices: { $sum: 1 },
            totalRevenue: { $sum: '$amount' },
            totalTax: { $sum: '$tax' },
            totalBilled: { $sum: '$total' },
            paidInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Paid'] }, 1, 0] } },
            overdueInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Overdue'] }, 1, 0] } },
            unpaidInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Unpaid'] }, 1, 0] } },
            sentInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Sent'] }, 1, 0] } },
            draftInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Draft'] }, 1, 0] } },
            voidInvoices: { $sum: { $cond: [{ $eq: ['$status', 'Void'] }, 1, 0] } },
          },
        },
      ]),
      Customer.countDocuments(),
    ]);

    const stats = invoiceStats[0] || {
      totalInvoices: 0,
      totalRevenue: 0,
      totalTax: 0,
      totalBilled: 0,
      paidInvoices: 0,
      overdueInvoices: 0,
      unpaidInvoices: 0,
      sentInvoices: 0,
      draftInvoices: 0,
      voidInvoices: 0,
    };

    res.json({ success: true, data: { ...stats, totalCustomers: customerCount } });
  } catch (err) {
    next(err);
  }
};

exports.getTopCustomers = async (req, res, next) => {
  try {
    const topCustomers = await Invoice.aggregate([
      {
        $group: {
          _id: '$customer',
          totalValue: { $sum: '$total' },
          invoiceCount: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
      { $sort: { totalValue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customerInfo',
        },
      },
      { $unwind: '$customerInfo' },
      {
        $project: {
          _id: 1,
          totalValue: 1,
          invoiceCount: 1,
          totalAmount: 1,
          name: '$customerInfo.name',
          company: '$customerInfo.company',
        },
      },
    ]);

    res.json({ success: true, data: topCustomers });
  } catch (err) {
    next(err);
  }
};
