let puppeteer = require("puppeteer");
let input = process.argv[2];

(async function fn() {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]
    });
    let details = movieTicketBooker(browserInstance);
  } catch (err) {
    console.log(err);
  }

})();

async function movieTicketBooker(browserInstance) {

  let newPage = await browserInstance.newPage();
  await newPage.goto("https://in.bookmyshow.com/explore/home");

  await newPage.waitForSelector("button#wzrk-cancel", { visible: true });
  await newPage.click("button#wzrk-cancel");
  await newPage.waitForSelector('.sc-RbTVP.fjyOHW [alt="NCR"]', { visible: true });
  await newPage.click('.sc-RbTVP.fjyOHW [alt="NCR"]');

  let url = newPage.url();
  await newPage.goto(url);
  await newPage.click(".sc-gmeYpB.MZHt");
  await newPage.type(".sc-gmeYpB.MZHt", "Godzilla vs. Kong", { Delay: 200 });
  await newPage.waitForSelector(".sc-ekulBa.ffzpQn", { visible: true });
  await newPage.click(".sc-ekulBa.ffzpQn");

  let url2 = newPage.url();
  await newPage.goto(url2);
  await newPage.waitForSelector("#page-cta-container", { visible: true });
  await newPage.click("#page-cta-container");

  await newPage.waitForTimeout(2000);

  await newPage.evaluate(formatSelectorFn, "IMAX 2D");
  await newPage.waitForTimeout(2000);
  await newPage.evaluate(movieDetailsFn, "18", "Ambience", "12:45");


}

function movieDetailsFn(movieDate, theater, showTime) {
  return new Promise(function (resolve, reject) {
    let movieDateArr = document.querySelectorAll(".date-numeric");
    let theaterArr = document.querySelectorAll(".__venue-name");
    let showtimeArr = document.querySelectorAll(".showtime-pill .__details");
    for (let i = 0; i < movieDateArr.length; i++) {
      if (movieDate == movieDateArr[i].innerText) {
        movieDateArr[i].click();
        for (let i = 0; i < theaterArr.length; i++) {
          if (theater == theaterArr[i].innerText) {
            resolve(theaterArr[i].click());
          }
        }
      }
    }


  })
}

function formatSelectorFn(formatName) {
  return new Promise(function (resolve, reject) {
    let movieFormatArr = document.querySelectorAll(".styles__DimensionComponent-vhz3gb-3.ejeujv span");
    for (let i = 0; i < movieFormatArr.length; i++) {
      if (formatName == movieFormatArr[i].innerText) {
        resolve(movieFormatArr[i].click());
      }
    }
    reject("Format Not Fount");
  })
}

async function waitNClick(selector) {

}