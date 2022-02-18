const expressAsyncHandler = require("express-async-handler");
const { fetch, fetchOne } = require('proxies-generator');
const userAgents = require('user-agents')
const agents = new userAgents();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const ppt = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const Jalankan = expressAsyncHandler(async (req, res, next) => {
    try {
        await mulai();
    } catch (error) {
        console.log(error)
    }
    res.json('ok')
});

/**
 * @type {puppeteer.Page[]}
 */
const listPage = []

/**
 * @type {ppt.Page}
 */
var pg;



async function mulai() {
    try {

        // let proxy = await fetchOne();
        const browser = await puppeteer.launch({
            headless: true,
            // ignoreDefaultArgs: [
            //     "--mute-audio",
            // ],
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                "--window-size=500,800",
                "--incognito",
                "--disable-web-security",
                "--autoplay-policy=no-user-gesture-required",
                "--lang=id-ID,id"
                // "--proxy-server=http://" + proxy.ip + ":" + proxy.port
            ],
            //userDataDir: "tmp",
            defaultViewport: {
                width: 500,
                height: 800
            }
        });

        await browser.createIncognitoBrowserContext();
        /**@type {ppt.Page} */
        let page = (await browser.pages())[0];
        pg = page;
        try {
            const cookie = fs.readFileSync('cookies.json', 'utf8');
            if (cookie) {
                const deserializedCookies = JSON.parse(cookie);
                await page.setCookie(...deserializedCookies);
                console.log("set cookies");
            }
        } catch (error) {
            console.log(error)
        }

        await page.setUserAgent(agents.random().data.userAgent);

        try {
            await page.goto("https://www.youtube.com/watch?v=yb0uyxFLu3Y");
            console.log("mulai");

        } catch (error) {
            await page.waitForTimeout(5000);
            console.log(error)
        }

        const cookies = await page.cookies();
        const cookieJson = JSON.stringify(cookies);
        fs.writeFileSync('cookies.json', cookieJson);
        console.log("cookies saved");

        await page.waitForTimeout(5000);
        let [ditonton] = await page.$x('//span[contains(@class,"view-count")]');
        let ton = await ditonton.getProperty('innerText');
        console.log(await ton.jsonValue());

        await page.waitForTimeout(40000);
        await browser.close();
        await mulai();

    } catch (error) {
       console.log(error)
    }

}

; (async () => {
    try {
        await mulai();
    } catch (error) {
        console.log(error)
    }
})();

module.exports = Jalankan;