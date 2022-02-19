const expressAsyncHandler = require("express-async-handler");
const userAgents = require('user-agents')
const agents = new userAgents();
const puppeteer = require('puppeteer-extra');
const ppt = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { db } = require("./firebase");
puppeteer.use(StealthPlugin());
const path = require('path');
const resizeImg = require('resize-img');

const Enmap = require("enmap");
const endb = new Enmap({ name: "endb", fetchAllData: true, autoFetch: true });

var percobaan = 0;

const Jalankan = expressAsyncHandler(async (req, res, next) => {
    try {
        await mulai();
    } catch (error) {
        console.log(error)
    }
    res.json('ok')
});



https://www.youtube.com/watch?app=android&v=yb0uyxFLu3Y 
var listLog = []
async function mulai() {

    listLog = [];
    let lebar = Math.floor(Math.random() * (500 - 400 + 1) + 400)
    let tinggi = Math.floor(Math.random() * (800 - 600 + 1) + 600)

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            "--window-size=" + lebar + "," + tinggi,
            "--incognito",
            "--disable-web-security",
            "--autoplay-policy=no-user-gesture-required",
            "--lang=id-ID,id",
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            // "--proxy-server=socks5://127.0.0.1:9050",
        ],
        //userDataDir: "tmp",
        defaultViewport: {
            width: lebar,
            height: tinggi,
        }
    });

    log(" coba memasang ignotios")
    await browser.createIncognitoBrowserContext();
    log("coba membuka halaman")
    /**@type {ppt.Page} */
    let page = (await browser.pages())[0];


    // const base64 = await page.screenshot({ encoding: "base64" })
    // const buffer = Buffer.from(base64, "base64");
    // const gam = await resizeImg(buffer, {
    //     width: 500,
    //     height: 800
    // });
    // const base64gam = gam.toString("base64");
    // db.ref('gambar').set(base64gam);

    try {

        log("halaman didapatkan")

        log("coba membaca cookies")
        const getCookies = await endb.get("cookies");
        if (getCookies != null && getCookies.length > 0) {
            log("cookies ditemukan", getCookies)
            await page.setCookie(...getCookies);
        } else {
            log("cookies tidak ditemukan")
        }

        // const cookie = fs.readFileSync('cookies.json', 'utf8');
        // log("cookies berhasil dipasangkan")
        // if (cookie) {
        //     const deserializedCookies = JSON.parse(cookie);
        //     await page.setCookie(...deserializedCookies);
        //     console.log("set cookies");
        // } else {
        //     log("cookies tidak didapatkan")
        // }

        log("coba memasang user agent")
        let agent = agents.random().data.userAgent
        log(agent);
        await page.setUserAgent(agent);
        log("coba menuju target")
        log("https://m.youtube.com/watch?app=android&v=yb0uyxFLu3Y")
        // await page.goto("https://www.youtube.com/embed/yb0uyxFLu3Y",{waitUntil: 'networkidle2'});
        await page.goto("http://localhost:4000/api/youtube", { waitUntil: 'networkidle2' });
        await page.waitForTimeout(1000);
        let [tombol] = await page.$x("//a[@id='button']");
        await tombol.click();
        log("mulai menonton target")

        await page.waitForTimeout(5000);
        try {
            log("coba mengambil gambar")
            const base64 = await page.screenshot({ encoding: "base64" })
            const buffer = Buffer.from(base64, "base64");
            const gam = await resizeImg(buffer, {
                width: 500,
                height: 800
            });
            const base64gam = gam.toString("base64");
            db.ref('gambar').set(base64gam);
            log("gambar berhasil dibuat")
        } catch (error) {
            log(" error ambil gambar => " + error)
        }

        // log("coba mendapatkan cookies")
        // const cookies = await page.cookies();
        // const cookieJson = JSON.stringify(cookies);
        // log("coba menyimpan cookies")
        // fs.writeFileSync('cookies.json', cookieJson);
        // log("cookies disimpan")


        await page.waitForTimeout(Math.round(Math.random() * (70000 - 40000) + 40000));

        log("coba mengembil cookies");
        const cookies = await page.cookies();
        log("cookies berhasil diambil", cookies)
        endb.set("cookies", cookies);

        log("ctutup lihat");
        await browser.close();
        log("browser dititup")
        log("ulang lagi");
        await mulai();

    } catch (error) {
        log(error);
        await page.waitForTimeout(Math.round(Math.random() * (5000 - 4000) + 4000));
        log("error , mengulang lagi")
        await browser.close();
        await mulai();

    }

}


function log(text) {
    listLog.push(text)
    db.ref('console').set(listLog.join(" \n"));
    db.ref('percobaan').set(percobaan);
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