function countCallories(age, height, weight, activity, sex) {
  let res = 0;
  let k = 0;
  if (activity.toString() === '0') {
    k = 1.2;
  }
  if (activity.toString() === '1') {
    k = 1.375;
  }
  if (activity.toString() === '2') {
    k = 1.55;
  }
  if (activity.toString() === '3') {
    k = 1.725;
  }
  if (activity.toString() === '4') {
    k = 1.9;
  }
  if (sex === 'male') {
    res = (10 * weight + (6, 25 * height) - (4, 92 * age) + 5) * k;
  }
  if (sex === 'female') {
    res = (10 * weight + (6, 25 * height) - (4, 92 * age) - 161) * k;
  }
  console.log(res, k);

  console.log('activity', activity.toString());
  console.log(res);
  return res;
}

module.exports = countCallories;
