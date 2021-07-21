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
