module.exports = {
  getToday: function () {
    /* CITATION Inspired by https://stackoverflow.com/a/47160545 */
    const date = new Date();
    let today = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    today = today.replace(/\//g, "-");
    return today;
  },
};
