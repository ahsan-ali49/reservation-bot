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

    await page.waitForSelector("#s-lc-new-reservation-form");

    let optionValue = "872";

    await page.select('select#s-lc-location', optionValue);

    let selectedValue = await page.evaluate(() => {
        // Replace 'yourSelectElementId' with the actual ID of your select element
        const select = document.querySelector('select#s-lc-location');
        return select.value;
    });
    
      // Verify if the selected value matches the expected value
    if (selectedValue === optionValue) {
        console.log(`Option with value ${optionValue} was successfully selected.`);
    } else {
        console.log(`Failed to select the option with value ${optionValue}.`);
    }

    optionValue = "427";

    await page.select('select#s-lc-zone', optionValue);
  
    selectedValue = await page.evaluate(() => {
          // Replace 'yourSelectElementId' with the actual ID of your select element
        const select = document.querySelector('select#s-lc-zone');
        return select.value;
    });
      
        // Verify if the selected value matches the expected value
    if (selectedValue === optionValue) {
          console.log(`Option with value ${optionValue} was successfully selected.`);
    } else {
        console.log(`Failed to select the option with value ${optionValue}.`);
    }
     
    optionValue = "2529";

    await page.select('select#s-lc-group', optionValue);
  
    selectedValue = await page.evaluate(() => {
          // Replace 'yourSelectElementId' with the actual ID of your select element
        const select = document.querySelector('select#s-lc-group');
        return select.value;
    });
      
        // Verify if the selected value matches the expected value
    if (selectedValue === optionValue) {
          console.log(`Option with value ${optionValue} was successfully selected.`);
    } else {
        console.log(`Failed to select the option with value ${optionValue}.`);
    }

    optionValue = "-1";

    await page.select('select#s-lc-type', optionValue);
  
    selectedValue = await page.evaluate(() => {
          // Replace 'yourSelectElementId' with the actual ID of your select element
        const select = document.querySelector('select#s-lc-type');
        return {value: select.value, text: select.innerHTML };
    });
      
        // Verify if the selected value matches the expected value
    if (selectedValue.value === optionValue) {
          console.log(`Option with value ${selectedValue.text} was successfully selected.`);
    } else {
        console.log(`Failed to select the option with value ${optionValue}.`);
    }

    await page.waitForSelector("#s-lc-go");

    await page.click("#s-lc-go");

    await page.waitForSelector("#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > button.fc-goToDate-button.btn.btn-default.btn-sm");

    await page.click(".fc-goToDate-button")

    await page.waitForSelector("#equip_ > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom > div.datepicker-days > table > tbody > tr:nth-child(2) > td:nth-child(4)")

    await page.click("#equip_ > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom > div.datepicker-days > table > tbody > tr:nth-child(2) > td:nth-child(4)")

    const desiredTitle = "01:00 Wednesday, February 7, 2024 - Quiet Study Room 2.04: Desk 482 - Available";

    await page.waitForSelector(`a[title="${desiredTitle}"]`);

    await page.click(`a[title="${desiredTitle}"]`);

    await page.waitForSelector('#submit_times', { visible: true });


    await page.click("#submit_times");
    await page.waitForNavigation();
    await page.waitForNavigation();

    const newUrl = page.url();
    const newTitle = await page.title();

    console.log(`Link clicked successfully. New URL: ${newUrl}, New Title: ${newTitle}`);


    await browser.close();
}

start();