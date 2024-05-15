import { BadRequestError } from "./expressError.js";


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  strNums = strNums.split(",");
  const nums = [];
  for (let strNum of strNums) {
    nums.push(Number(strNum));
  }
  return nums;
}


export { convertStrNums };