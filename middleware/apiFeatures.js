class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  checkRole() {
    if (this.queryString.housemaid === "true") {
      this.query = this.query.find({ housemaid: this.queryString.housemaid });
    } else {
      console.log(this.queryString);
      this.query = this.query.find({ babysister: true });
    }
    return this;
  }

  checkStatus() {
    if (parseInt(this.queryString.status) === 0) {
      console.log(this.queryString.status);
      this.query = this.query.find({
        status: parseInt(this.queryString.status),
      });
      return this;
    } else {
      return this;
    }
  }

  filter() {
    if (this.queryString.querySearch) {
      this.query.find({
        $or: [
          {
            experience: { $regex: this.queryString.querySearch, $options: "i" },
          },
          {
            description: {
              $regex: this.queryString.querySearch,
              $options: "i",
            },
          },
        ],
      });
      return this;
    } else {
      return this;
    }
  }

  filterDate() {
    if (this.queryString.queryDate) {
      this.query.find({
        age: { $regex: this.queryString.queryDate, $options: "i" },
      });
      return this;
    } else {
      return this;
    }
  }

  salary() {
    if (this.queryString.salary) {
      console.log(parseInt(this.queryString.salary));
      this.query.find({ salary: { $lte: parseInt(this.queryString.salary) } });
      return this;
    } else {
      return this;
    }
  }

  date() {
    if (this.queryString.age) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();

      const date = year - parseInt(this.queryString.age);
      console.log(date);
      const dateOB = date + "-01-01T00:00:00Z";

      console.log(dateOB);

      this.query.find({ dateOB: { $gte: dateOB } });
      return this;
    } else {
      return this;
    }
  }

  sort() {
    if (this.queryString.sort === "asc") {
      this.query.sort({ salary: this.queryString.sort });
      return this;
    } else {
      return this;
    }
  }
}

module.exports = APIFeatures;
