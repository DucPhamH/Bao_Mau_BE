const EMPLOYEE_STATUS = {
  HAS_JOB: 1,
  NO_JOB: 0,
};

const POST_STATUS = {
  HAS_JOB: 1,
  NO_JOB: 0,
  PENDING: 2,
};

const REQUEST_STATUS = {
  IS_USER: 0,
  IS_EMPLOYEE: 1,
  ACCEPT: 2,
  PENDING: 3,
};

const PAYMENT_STATUS = {
  NO_PAY: 0,
  YES_PAY: 1,
};

module.exports = {
  EMPLOYEE_STATUS,
  POST_STATUS,
  REQUEST_STATUS,
  PAYMENT_STATUS,
};
