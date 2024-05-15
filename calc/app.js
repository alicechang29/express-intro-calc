/** Simple demo Express app. */
import { findMean, findMode, findMedian } from "./stats.js";
import { convertStrNums } from "./utils.js";
import express from "express";
const app = express();


// useful error class to throw
import { NotFoundError } from "./expressError.js";


const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  let nums = req.query.nums; //how to turn this into array
  nums = convertStrNums(nums);

  const operation = "mean";
  const result = findMean(nums);

  if (!nums) {
    throw new BadRequestError(MISSING);

  }

  return res.json({
    operation, result
  });
});

//all params become keys in object called req.params

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  let nums = req.query.nums;
  nums = convertStrNums(nums);
  const operation = "median";
  const result = findMedian(nums);

  return res.json({
    operation, result
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  let nums = req.query.nums;
  nums = convertStrNums(nums);
  const operation = "mode";
  const result = findMode(nums);

  return res.json({
    operation, result
  });
});



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



export default app;
