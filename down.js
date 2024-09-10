import { connect } from "puppeteer-real-browser";
import axios from 'axios';
import fs from 'node:fs';

let info = {
    url: '',
    protocolDomain: 'https://booktoki350.com',
    siteTitle: '북토끼',
    site: 'booktoki',
    startIndex: 0,
    lastIndex: 99999,
    contentTitle: '화산귀환'
}

function sleep(num) {
    return new Promise(function (resolve) {
        setTimeout(() => { resolve(); }, num);
    })
}
function consoleRed(val) {
    console.log(`\x1b[41m${val}\x1b[0m`);
}
function consoleGrey(val) {
    console.log(`\x1b[100m${val}\x1b[0m`);
}
function help() {
    console.log(`사용법: node down -url "URL" [-start STARTINDEX] [-last LASTINDEX]`);
    process.exit();
}

function analyseArguments() {
    let argL = process.argv.length;
    if (argL == 2) {
        help();
    }
    for (let i = 2; i < argL; i++) {
        if (process.argv[i] == '-url') {
            if ((i + 1) < argL) {
                info.url = process.argv[i + 1];
                i++;
            }
        }
        else if (process.argv[i] == '-start') {
            if ((i + 1) < argL) {
                info.startIndex = parseInt(process.argv[i + 1]);
                i++;
            }
        }
        else if (process.argv[i] == '-last') {
            if ((i + 1) < argL) {
                info.lastIndex = parseInt(process.argv[i + 1]);
                i++;
            }
        }
        else if (process.argv[i] == '-h' || process.argv[i] == '-help') {
            help();
        }
    }
    if (!info.url) {
        consoleGrey('url을 입력하세요');
        process.exit();
    }
    // check url
    // 북토끼
    if (info.url.match(/^https:\/\/booktoki[0-9]+.com\/novel\/[0-9]+/)) {
        info.site = 'booktoki'; info.siteTitle = '북토끼';
        info.protocolDomain = info.url.match(/^https:\/\/booktoki[0-9]+.com/)[0];
    }
    // 뉴토끼
    else if (info.url.match(/^https:\/\/newtoki[0-9]+.com\/webtoon\/[0-9]+/)) {
        info.site = 'newtoki'; info.siteTitle = '뉴토끼';
        info.protocolDomain = info.url.match(/^https:\/\/newtoki[0-9]+.com/)[0];
    }
    // 마나토끼
    else if (info.url.match(/^https:\/\/manatoki[0-9]+.net\/comic\/[0-9]+/)) {
        info.site = 'manatoki'; info.siteTitle = '마나토끼';
        info.protocolDomain = info.url.match(/^https:\/\/manatoki[0-9]+.net/)[0];
    }
    else {
        consoleGrey('회차 목록 페이지 url을 입력해야합니다. url을 확인해주세요.');
        process.exit();
    }
}
function saveBook(path, fileName, content) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(`${path}/${fileName}`, content);
}
function saveImage(path, fileName, src) {
    return new Promise((resolve) => {
        axios.get(src, {
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
            }
        }).then(function (response) {
            if (!fs.existsSync(path))
                fs.mkdirSync(path, { recursive: true });
            let writer = fs.createWriteStream(`${path}/${fileName}`);
            response.data.pipe(writer);
            response.data.on('error', (err) => {
                consoleGrey(`${path}/${fileName} download on error`);
                resolve();
            });
            writer.on('finish', () => {
                // console.log(`${path}/${fileName} download success`);
                resolve();
            });
        }).catch(function (error) {
            consoleRed(`download error: ${path}/${fileName}`);
            console.log(`재시도합니다`);
            //console.log(error);
            return saveImage(path, fileName, src);
        })
    })
}

async function main() {
    const { browser, page } = await connect({
        headless: false,
        args: [],
        customConfig: {},
        turnstile: false, //captcha를 자동으로 풀것인지
        connectOption: { defaultViewport: null },
        disableXvfb: true, //화면을 볼것인지
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }
    })
    try {
        // await page.goto('https://booktoki350.com/');
        await Promise.all([page.waitForNavigation(), page.goto(info.url)]);
        // cloudflare에 막혔다면 다시 기다린다.
        while (!(await page.title()).includes(info.siteTitle)) {
            await page.waitForNetworkIdle();
        }
        let link = [];
        while (true) {
            await page.locator('.list-body').setTimeout(40000).wait();
            sleep(1000);
            link = link.concat(await page.evaluate(() => {
                let list = Array.from(document.querySelector('.list-body').querySelectorAll('li'));
                for (let i = 0; i < list.length; i++) {
                    list[i] = {
                        num: list[i].querySelector('.wr-num').innerText.padStart(4, '0'),
                        fileName: list[i].querySelector('a').innerHTML.replace(/<span[\s\S]*?\/span>/g, '').trim(),
                        src: list[i].querySelector('a').href
                    }
                }
                return list;
            }));
            info.contentTitle = await page.evaluate(() => document.querySelector('.page-title .page-desc').innerText);
            // 다음 페이지가 없다면 break
            if (await page.$('ul.pagination li[class="active"] ~ li:not([class="disabled"]) a')) {
                await Promise.all([
                    page.waitForNavigation(),
                    page.locator('ul.pagination li[class="active"] ~ li:not([class="disabled"]) a').click()
                ]);
            }
            else
                break;
        }
        link.reverse();
        // info.startIndex와 info.lastIndex필터하기.
        while (parseInt(link[0].num) < info.startIndex) {
            link.shift();
        }
        while (info.lastIndex < parseInt(link.at(-1).num)) {
            link.pop();
        }
        // 페이지 방문하기
        for (let i = 0; i < link.length; i++) {
            await Promise.all([page.goto(link[i].src), page.waitForNavigation()]);
            await sleep(1000);
            console.log(`${link[i].num} ${link[i].fileName} 진행중`);
            // 북토끼
            if (info.site === "booktoki") {
                await page.locator('#novel_content').wait();
                // 텍스트 가져오기
                let fileContent = await page.evaluate(() => {
                    let textLists = document.querySelector('#novel_content').querySelectorAll('div > div> p, div > div> div');
                    let fileContent = '';
                    for (let j = 0; j < textLists.length; j++) {
                        fileContent += textLists[j].innerText;
                        fileContent += '\n';
                    }
                    return fileContent;
                });
                // 텍스트 저장. 이미 있다면 저장하지 않음.
                if (!fs.existsSync(`./북토끼/${info.contentTitle}/${link[i].num} ${link[i].fileName}.txt`))
                    saveBook(`./북토끼/${info.contentTitle}`, `${link[i].num} ${link[i].fileName}.txt`, fileContent);
            }
            // 뉴토끼, 마나토끼
            else {
                await page.waitForSelector('.view-padding div img');
                // 이미지 가져오기
                let imgLists = await page.evaluate(() => {
                    // view-padding의 div의 img.
                    let imgLists = Array.from(document.querySelectorAll('.view-padding div img'));
                    // 화면에 보이지 않는 이미지라면 리스트에서 제거
                    for (let j = 0; j < imgLists.length;) {
                        if (imgLists[j].checkVisibility() === false)
                            imgLists.splice(j, 1);
                        else {
                            let src = imgLists[j].outerHTML.match(/https[^"]+/)[0];
                            imgLists[j] = { src, extension: src.match(/\.[a-zA-Z]+$/)[0] }
                            j++;
                        }
                    }
                    return imgLists;
                })
                console.log(`이미지 ${imgLists.length}개 감지`);
                let promiseList = [];
                for (let j = 0; j < imgLists.length; j++) {
                    const path = `./${info.siteTitle}/${info.contentTitle}/${link[i].num} ${link[i].fileName}`;
                    const fileName = `${link[i].num} ${link[i].fileName} image${j.toString().padStart(4, '0')}${imgLists[j].extension}`;
                    // axios로 이미지 다운. 있다면 다운하지 않는다.
                    if (!fs.existsSync(`${path}/${fileName}`))
                        promiseList.push(saveImage(path, fileName, `${imgLists[j].src.replace(/https:\/\/[^/]+/, info.protocolDomain)}`));
                        // protocolDomain으로 바꿈으로서 CORS 해결
                }
                await Promise.all(promiseList);
            }
        }
    } catch (error) {
        console.log(error);
        await browser.close();
    } finally {
        await browser.close();
    }

}

analyseArguments();
main();
