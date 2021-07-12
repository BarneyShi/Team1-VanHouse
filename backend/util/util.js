var got = require("got");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

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

  /* CITATION: https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js */
  getCoordinates: async function (zipCode) {
    try {
      const zipCodeWithoutSpace = zipCode.replace(/\s/g, "");
      const zipCode_1 = zipCodeWithoutSpace.substr(0, 3);
      const zipCode_2 = zipCodeWithoutSpace.substr(3);

      const url = `https://geocoder.ca/?locate=${zipCode_1}+${zipCode_2}&geoit=GeoCode`;

      const response = await got(url);
      const dom = new JSDOM(response.body);

      const coordsString =
        dom.window.document.querySelector("td > p > strong").textContent;
      const coordsArr = coordsString.split(",");
      const coords = {
        latitude: coordsArr[0].trim(),
        longitude: coordsArr[1].trim(),
      };
      return coords;
    } catch (err) {
      console.log("Error while fetching coordinates ", err);
      return {
        latitude: 49.2827,
        longitude: -123.1207,
      };
    }
  },
};
