const puppeteer = require("puppeteer");
const fs = require("fs").promises;
async function naukri(totalPage) {
  console.log("Naukri Scrapping");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  let internships = [];

  const page = await browser.newPage();
  let currPage = 1;
  while (totalPage >= currPage) {
    await page.goto(
      `https://www.naukri.com/internship-jobs${
        totalPage == 1 ? "" : `-${currPage}`
      }?k=internship&experience=0`
    );
    await delay(2000);
    let internshipHandles = await page.$$(".list > .jobTuple");
    for (let i = 0; i < internshipHandles.length; i++) {
      let title = await internshipHandles[i].$eval(
        "div.info > a.title.ellipsis",
        (element) => element.textContent.trim()
      );
      let link = await internshipHandles[i].$eval(
        "div.info > a.title.ellipsis",
        (element) => element.href
      );

      let companyName = await internshipHandles[i].$eval(
        "div.info.fleft > div > a.subTitle",
        (element) => element.textContent.trim()
      );
      let location = await internshipHandles[i].$eval(".location", (element) =>
        element.textContent.trim()
      );
      let stipend = await internshipHandles[i].$eval(".salary", (element) =>
        element.textContent.trim()
      );
      let desc = await internshipHandles[i].$eval(
        ".job-description",
        (element) => element.textContent.trim()
      );
      // let tags = await internshipHandles[i].$eval(
      //   ".has-description",
      //   (element) => element.textContent.trim()
      // );
      let internshipData = {
        site: "naukri",
        title,
        companyName,
        link,
        location,
        stipend,
        description: desc,
      };
      internships.push(internshipData);
    }
    currPage++;
  }
  console.log(internships);
  console.log(internships.length);
  await browser.close();
  console.log("Total Internship Found " + internships.length);
  
  await fs.writeFile('./data/naukri.json', JSON.stringify(internships, null, 2));
}

// naukri(3);
module.exports = naukri;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
