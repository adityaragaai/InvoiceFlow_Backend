class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.filterObj = {};
  }

  filter() {
    const { status, customer, issueDateFrom, issueDateTo, dueDateFrom, dueDateTo, search } =
      this.queryString;

    if (status) this.filterObj.status = status;
    if (customer) this.filterObj.customer = customer;

    if (issueDateFrom || issueDateTo) {
      this.filterObj.issueDate = {};
      if (issueDateFrom) this.filterObj.issueDate.$gte = new Date(issueDateFrom);
      if (issueDateTo) this.filterObj.issueDate.$lte = new Date(issueDateTo);
    }

    if (dueDateFrom || dueDateTo) {
      this.filterObj.dueDate = {};
      if (dueDateFrom) this.filterObj.dueDate.$gte = new Date(dueDateFrom);
      if (dueDateTo) this.filterObj.dueDate.$lte = new Date(dueDateTo);
    }

    this.query = this.query.find(this.filterObj);
    return this;
  }

  sort() {
    const sortBy = this.queryString.sortBy || 'createdAt';
    const order = this.queryString.order === 'asc' ? 1 : -1;
    const allowedSorts = ['amount', 'dueDate', 'issueDate', 'total', 'createdAt'];
    const field = allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
    this.query = this.query.sort({ [field]: order });
    return this;
  }

  paginate() {
    const page = Math.max(parseInt(this.queryString.page, 10) || 1, 1);
    const limit = Math.min(parseInt(this.queryString.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;
    return this;
  }
}

module.exports = APIFeatures;
