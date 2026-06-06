require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');

const SEED_FILE = path.join(__dirname, 'seed-data.json');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const rawData = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
    console.log(`Loaded ${rawData.length} records from seed-data.json`);

    // Build unique customer map: name -> company
    const customerMap = new Map();
    for (const record of rawData) {
      if (!customerMap.has(record.customer)) {
        customerMap.set(record.customer, record.company);
      }
    }

    console.log(`Found ${customerMap.size} unique customers`);

    // Upsert customers
    const customerIdMap = new Map();
    for (const [name, company] of customerMap) {
      const customer = await Customer.findOneAndUpdate(
        { name },
        { name, company },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      customerIdMap.set(name, customer._id);
    }
    console.log('Customers seeded');

    // Clear existing invoices
    await Invoice.deleteMany({});
    console.log('Cleared existing invoices');

    // Insert invoices in batches
    const BATCH_SIZE = 200;
    let inserted = 0;
    for (let i = 0; i < rawData.length; i += BATCH_SIZE) {
      const batch = rawData.slice(i, i + BATCH_SIZE).map((record) => ({
        invoiceId: record.invoiceId,
        customer: customerIdMap.get(record.customer),
        amount: record.amount,
        taxRate: record.taxRate,
        tax: record.tax,
        total: record.total,
        status: record.status,
        issueDate: new Date(record.issueDate),
        dueDate: new Date(record.dueDate),
      }));

      await Invoice.insertMany(batch, { ordered: false });
      inserted += batch.length;
      console.log(`Inserted ${inserted}/${rawData.length} invoices`);
    }

    console.log('Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
