const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

exports.getInvoices = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      status,
      customer,
      taxRate,
      search,
      issueDateFrom,
      issueDateTo,
      dueDateFrom,
      dueDateTo,
    } = req.query;

    const allowedSorts = ['amount', 'dueDate', 'issueDate', 'total', 'createdAt'];
    const sortField = allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
    const sortDir = order === 'asc' ? 1 : -1;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter = {};

    if (status) filter.status = status;
    if (customer) filter.customer = customer;
    if (taxRate !== undefined && taxRate !== '') filter.taxRate = Number(taxRate);

    if (issueDateFrom || issueDateTo) {
      filter.issueDate = {};
      if (issueDateFrom) filter.issueDate.$gte = new Date(issueDateFrom);
      if (issueDateTo) filter.issueDate.$lte = new Date(issueDateTo);
    }

    if (dueDateFrom || dueDateTo) {
      filter.dueDate = {};
      if (dueDateFrom) filter.dueDate.$gte = new Date(dueDateFrom);
      if (dueDateTo) filter.dueDate.$lte = new Date(dueDateTo);
    }

    if (search) {
      const matchingCustomers = await Customer.find({
        name: { $regex: search, $options: 'i' },
      }).select('_id');
      const customerIds = matchingCustomers.map((c) => c._id);

      filter.$or = [
        { invoiceId: { $regex: search, $options: 'i' } },
        { customer: { $in: customerIds } },
      ];
      // Remove direct customer filter when searching
      delete filter.customer;
    }

    const [invoices, total] = await Promise.all([
      Invoice.find(filter)
        .populate('customer', 'name company')
        .sort({ [sortField]: sortDir })
        .skip(skip)
        .limit(limitNum),
      Invoice.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: invoices,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('customer', 'name company');
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const { customer, amount, taxRate, status, issueDate, dueDate, invoiceId } = req.body;

    const amt = Number(amount);
    const rate = Number(taxRate);
    const tax = parseFloat(((amt * rate) / 100).toFixed(2));
    const total = parseFloat((amt + tax).toFixed(2));

    const invoice = await Invoice.create({
      invoiceId: invoiceId || `INV-${Date.now()}`,
      customer,
      amount: amt,
      taxRate: rate,
      tax,
      total,
      status: status || 'Draft',
      issueDate,
      dueDate,
    });

    const populated = await invoice.populate('customer', 'name company');
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const existing = await Invoice.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Invoice not found' });

    const { amount, taxRate, ...rest } = req.body;
    const updates = { ...rest };

    const newAmount = amount !== undefined ? Number(amount) : existing.amount;
    const newTaxRate = taxRate !== undefined ? Number(taxRate) : existing.taxRate;

    if (amount !== undefined || taxRate !== undefined) {
      updates.amount = newAmount;
      updates.taxRate = newTaxRate;
      updates.tax = parseFloat(((newAmount * newTaxRate) / 100).toFixed(2));
      updates.total = parseFloat((newAmount + updates.tax).toFixed(2));
    }

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('customer', 'name company');

    res.json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (err) {
    next(err);
  }
};
