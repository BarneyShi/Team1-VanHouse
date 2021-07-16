const getErrorString = async (error) => {
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

export default getErrorString;