const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.ucl.ac.uk/library/using-library/libraries-and-study-spaces/bookable-study-spaces-help", {timeout: 0});
    
    // await page.screenshot({path: "amazing.png"});
    // await page.screenshot({path: "amazing.png", fullPage: true});
    // const names = ["red", "orange", "yellow"];
    // await fs.writeFile("names.txt", names.join("\r\n"));

    await page.click('a[href="https://library-calendars.ucl.ac.uk/r"]');
    
    await page.waitForSelector("#s-lc-new-reservation-start");

    await page.click("#s-lc-new-reservation-start");


    const newUrl = page.url();
    const newTitle = await page.title();

    console.log(`Link clicked successfully. New URL: ${newUrl}, New Title: ${newTitle}`);


    await browser.close();
}

start();