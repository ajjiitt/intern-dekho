const fs = require("fs").promises;
const puppeteer = require("puppeteer");

async function linkedin(tags) {
  console.log("LinkedIN Scrapping");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  const cookiesString = await fs.readFile("./data/cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  let internships = [];

  await page.goto(
    `https://www.linkedin.com/jobs/search?keywords=${"internships"}&location=India&refresh=true`,
    {
      waitUntil: "domcontentloaded",
    }
  );
  await delay(5000);
  let noOfPages = await page.$eval(
    "ul.artdeco-pagination__pages.artdeco-pagination__pages--number > li:last-child",
    (element) => element.textContent.trim()
  );
  noOfPages = Math.min(noOfPages, 10);

  for (let j = 0; j < noOfPages; j++) {
    let offset = j * 25;
    await page.goto(
      `https://www.linkedin.com/jobs/search?keywords=${"internships"}&location=India&refresh=true&start=${offset}`,
      {
        waitUntil: "domcontentloaded",
      }
    );
    await delay(5000);
    let internshipHandles = await page.$$(
      "section.scaffold-layout__list > div > ul.scaffold-layout__list-container > li"
    );
    for (let i = 0; i < internshipHandles.length; i++) {
      await internshipHandles[i].click(".job-card-container");
      //   await page.waitForSelector(".jobs-unified-top-card__job-title");
      await delay(1000);

      let title = await page.$eval(
        ".jobs-unified-top-card__job-title",
        (element) => element.textContent.trim()
      );

      let companyName = await page.$eval(
        "div.jobs-unified-top-card__primary-description > span.jobs-unified-top-card__subtitle-primary-grouping.t-black > span.jobs-unified-top-card__company-name",
        (element) => element.textContent.trim()
      );
      let location = await page.$eval(
        "div.jobs-unified-top-card__primary-description > span.jobs-unified-top-card__subtitle-primary-grouping.t-black > span.jobs-unified-top-card__bullet",
        (element) => element.textContent.trim()
      );
      let type = "";
      if (
        (await page.$(
          "section.scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details > div > div.job-view-layout.jobs-details > div:nth-child(1) > div > div:nth-child(1) > div > div.relative.jobs-unified-top-card__container--two-pane > div.jobs-unified-top-card__content--two-pane > div.jobs-unified-top-card__primary-description > span.jobs-unified-top-card__subtitle-primary-grouping.t-black > span.jobs-unified-top-card__workplace-type"
        )) !== null
      ) {
        type = await page.$eval(
          "section.scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details > div > div.job-view-layout.jobs-details > div:nth-child(1) > div > div:nth-child(1) > div > div.relative.jobs-unified-top-card__container--two-pane > div.jobs-unified-top-card__content--two-pane > div.jobs-unified-top-card__primary-description > span.jobs-unified-top-card__subtitle-primary-grouping.t-black > span.jobs-unified-top-card__workplace-type",
          (element) => element.textContent.trim()
        );
      }
      let description = await page.$eval("#job-details", (element) =>
        element.textContent.trim()
      );
      let link = await page.$eval(
        "div.full-width.artdeco-entity-lockup__title.ember-view > a",
        (element) => element.href.trim()
      );

      let internshipData = {
        site: "LinkedIN",
        title,
        companyName,
        location: location + ", " + type,
        description,
        link,
        stipend: "Not disclosed",
      };
      internships.push(internshipData);
    }
  }

  console.log(internships);
  console.log(internships.length);

  //   await browser.close();
}

async function getCookies() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/");

  await delay(50000);

  //save cookies
  const cookies = await page.cookies();
  console.log(cookies);
  await fs.writeFile("./data/cookies.json", JSON.stringify(cookies, null, 2));
  await browser.close();
}

module.exports = getCookies;
linkedin();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
