import moment from "moment";

export const getErrorString = async (error) => {
  if (typeof error.json === "undefined") {
    return `${error.message}`;
  }
  let errorText = "";
  try {
    const errorRes = await error.json();
    errorText = `${error.status} (${error.statusText}) ${errorRes.errorMessage}`;
  } catch {
    errorText = `${error.status} (${error.statusText})`;
  }
  return errorText;
};

export const daysFromNow = (arr) => {
  const today = moment();
  return arr.map((date) => {
    const m = moment(date, "DD-MM-YYYY");
    return today.diff(moment(m), "days");
  });
};

export const priceRange = (arr) => {
  const range = [
    { name: "Under $1000", amount: 0 },
    { name: "Between $1000 - $2000", amount: 0 },
    { name: "Between $2000 - $3000", amount: 0 },
    { name: "Between $3000 - $4000", amount: 0 },
    { name: "Between $4000 - $5000", amount: 0 },
    { name: "Above %5000", amount: 0 },
  ];
  arr.forEach((e) => {
    if (e <= 1000) {
      range[0].amount += 1;
    } else if (e > 1000 && e <= 2000) {
      range[1].amount += 1;
    } else if (e > 2000 && e <= 3000) {
      range[2].amount += 1;
    } else if (e > 3000 && e <= 4000) {
      range[3].amount += 1;
    } else if (e > 4000 && e <= 5000) {
      range[4].amount += 1;
    } else if (e > 5000) {
      range[5].amount += 1;
    }
  });
  return range;
};
