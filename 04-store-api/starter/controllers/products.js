const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    //throw new Error ('testing async errors')
    const search = 'aaa'
    const products = await Product.find({}).sort('name')
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true";
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const conditions = numericFilters.split(",").map((c) => c.trim());
    conditions.forEach((condition) => {
      const match = condition.match(/(>=|<=|>|<|=)/);
      if (!match) return;

      const operator = match[0];
      const parts = condition.split(operator);
      const field = parts[0].trim();
      const value = parts.slice(1).join("").trim();

      if (["price", "rating"].includes(field)) {
        queryObject[field] = {
          ...(queryObject[field] || {}),
          [operatorMap[operator]]: Number(value),
        };
      }
    });
  }

  console.log("Final queryObject:", JSON.stringify(queryObject, null, 2));

  let query = Product.find(queryObject);

//sort
  if (sort) {
    query = query.sort(sort.split(",").join(" "));
  } else {
    query = query.sort("-createdAt");
  }

  // fields
  if (fields) {
    query = query.select(fields.split(",").join(" "));
  }

  //  pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const products = await query;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {getAllProductsStatic, getAllProducts}