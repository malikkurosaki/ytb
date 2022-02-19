const expressAsyncHandler = require("express-async-handler");
const { fetch, fetchOne } = require('proxies-generator');
const userAgents = require('user-agents')
const agents = new userAgents();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const ppt = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { db } = require("./firebase");
const resizeImg = require('resize-img');
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
 * @type {ppt.Page}
 */
var pg;


var listLog = []
async function mulai() {
    listLog = [];


    try {
        log("coba membuka browser")
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
                "--lang=id-ID,id",
                // "--proxy-server=socks5://127.0.0.1:9050",
            ],
            //userDataDir: "tmp",
            defaultViewport: {
                width: Math.floor(Math.random() * (500 - 400 + 1) + 400),
                height: Math.floor(Math.random() * (800 - 600 + 1) + 600),
            }
        });

        log(" coba memasang kacamata")
        await browser.createIncognitoBrowserContext();
        log("coba membuka halaman")
        /**@type {ppt.Page} */
        let page = (await browser.pages())[0];
        pg = page;
        log("halaman didapatkan")
        await jepret();

        try {
            log("coba membaca cookies")
            const cookie = fs.readFileSync('cookies.json', 'utf8');
            log("cookies berhasil dipasangkan")
            if (cookie) {
                const deserializedCookies = JSON.parse(cookie);
                await page.setCookie(...deserializedCookies);
                console.log("set cookies");
            } else {
                log("cookies tidak didapatkan")
            }
        } catch (error) {
            console.log(error)
            log("error memasang cookies " + error)
        }

        try {
            log("coba memasang user agent")
            let agent = agents.random().data.userAgent
            log(agent);
            await page.setUserAgent(agent);
            log("coba menuju target")
            log("https://www.youtube.com/watch?v=yb0uyxFLu3Y")
            await page.goto("https://www.youtube.com/watch?v=yb0uyxFLu3Y",);
            log("mulai menonton target")
        } catch (error) {
            await page.waitForTimeout(5000);
            log("error menuju target " + error)

        }

        try {
            log("coba mendapatkan cookies")
            const cookies = await page.cookies();
            const cookieJson = JSON.stringify(cookies);
            log("coba menyimpan cookies")
            fs.writeFileSync('cookies.json', cookieJson);
            log("cookies disimpan")
        } catch (error) {
            log("error saat menyimpan cookies " + error)
        }

        log("tunggu menutup browser");
        await page.waitForTimeout(Math.round(Math.random() * (70000 - 40000) + 40000));
        await browser.close();
        log("browser dititup")
        log("ulang lagi");
        await mulai();


    } catch (error) {
        log(error);

    }

}


async function jepret() {
    var nonton = 0;
    let ulang = setInterval(async () => {
        nonton++;
        try {
            const base64 = await pg.screenshot({ encoding: "base64" })
            const buffer = Buffer.from(base64, "base64");
            const gam = await resizeImg(buffer, {
                width: 500,
                height: 800
            });
            const base64gam = gam.toString("base64");
            db.ref('gambar').set(base64gam);
            log("update gambar")
        } catch (error) {
            clearInterval(ulang);
            log("error menyimpan gambar")
        }

        log("nonton " + nonton);
    }, 1000);

}

function log(text) {
    listLog.push(text)
    db.ref('console').set(listLog.join(" \n"))
    console.log(text)
}

; (async () => {
    try {
        await mulai();
    } catch (error) {
        console.log(error)
    }
})();

module.exports = { Jalankan };