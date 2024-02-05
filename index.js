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

    // await selectOption(page, "s-lc-location", "872");

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

    const newUrl = page.url();
    const newTitle = await page.title();

    console.log(`Link clicked successfully. New URL: ${newUrl}, New Title: ${newTitle}`);


    await browser.close();
}

async function selectOption(page, id, optionValue){

    await page.select('select#'+id, optionValue);
  
    selectedValue = await page.evaluate(({id: id}) => {
          // Replace 'yourSelectElementId' with the actual ID of your select element
        const select = document.querySelector('select#'+id);
        return select.value;
    });
      
        // Verify if the selected value matches the expected value
    if (selectedValue === optionValue) {
          console.log(`Option with value ${optionValue} was successfully selected.`);
    } else {
        console.log(`Failed to select the option with value ${optionValue}.`);
    }

}

start();