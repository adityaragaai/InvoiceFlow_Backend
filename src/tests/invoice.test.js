const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

let testCustomerId;
let testInvoiceId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invoice_test');
  const customer = await Customer.create({ name: 'Test Customer', company: 'Test Corp' });
  testCustomerId = customer._id;
});

afterAll(async () => {
  await Invoice.deleteMany({ customer: testCustomerId });
  await Customer.findByIdAndDelete(testCustomerId);
  await mongoose.connection.close();
});

describe('Invoice API', () => {
  it('GET /api/invoices - returns paginated invoices', async () => {
    const res = await request(app).get('/api/invoices?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.pagination).toBeDefined();
  });

  it('POST /api/invoices - creates a new invoice', async () => {
    const res = await request(app).post('/api/invoices').send({
      customer: testCustomerId,
      amount: 1000,
      taxRate: 18,
      status: 'Draft',
      issueDate: '2025-01-01',
      dueDate: '2025-02-01',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tax).toBe(180);
    expect(res.body.data.total).toBe(1180);
    testInvoiceId = res.body.data._id;
  });

  it('GET /api/invoices/:id - returns single invoice', async () => {
    const res = await request(app).get(`/api/invoices/${testInvoiceId}`);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(testInvoiceId);
  });

  it('PUT /api/invoices/:id - updates invoice', async () => {
    const res = await request(app)
      .put(`/api/invoices/${testInvoiceId}`)
      .send({ status: 'Paid', amount: 2000, taxRate: 5 });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('Paid');
    expect(res.body.data.tax).toBe(100);
    expect(res.body.data.total).toBe(2100);
  });

  it('DELETE /api/invoices/:id - deletes invoice', async () => {
    const res = await request(app).delete(`/api/invoices/${testInvoiceId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/dashboard/summary - returns summary stats', async () => {
    const res = await request(app).get('/api/dashboard/summary');
    expect(res.status).toBe(200);
    expect(res.body.data.totalInvoices).toBeDefined();
  });

  it('GET /api/dashboard/top-customers - returns top customers', async () => {
    const res = await request(app).get('/api/dashboard/top-customers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
