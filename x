#!/usr/bin/env bash
login="sshpass -p gg123@#$ ssh root@47.250.56.127"
gitAwal() {
    echo "# ytb" >>README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/malikkurosaki/ytb.git
    git push -u origin main
}

menu() {
    local m="
    YTB                             MENU


    "

    echo "$m"
}

npmInit() {
    local n=$(npm i puppeteer express express-async-handler cors)
    echo -e "$n"
}

push() {

    git add .
    git commit -m "update"
    git push origin main -f
    $login -t "pm2 stop all && cd /root/makuro/ytb && git pull origin main && source ~/.nvm/nvm.sh && npm install && pm2 stop all && pm2 restart all"

}

npm() {
    case $2 in
    init) npmInit ;;
    *) echo "npm" ;;
    esac
}

waktu() {

    while true; do
        wak=$(date +"%H:%M:%S")
        clear
        echo -e "waktunya adalah: $wak \n"
        sleep 1
    done
}

single() {
    case $1 in
    i) menu ;;
    start) pm2 start controller/jalankan.js --name "ytb" ;;
    log) pm2 logs --name "ytb" ;;
    wk) waktu ;;
    push) push ;;
    *) echo "[command]" ;;
    esac
}

double() {
    case "$1$2" in
    local-build) npm run build ;;
    local-start)
        nodemon controller/jalankan.js --ignore cookies.json &
        npm run dev
        ;;
    server-login) $login ;;
    server-ls) $login -t "cd /root/makuro/ytb && ls " ;;
    server-run) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 start server.js --name server" ;;
    server-start) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 start controller/jalankan.js --name ytb" ;;
    server-status) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 status" ;;
    server-restart) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 restart all " ;;
    server-restartS) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 restart server " ;;
    server-restartY) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 restart all " ;;
    server-log) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 logs" ;;
    server-stop) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 stop all" ;;
    server-delete) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 delete ytb" ;;
    *) echo "[command] [param]" ;;
    esac
}

if [[ -z $1 && -z $2 ]]; then
    menu
elif [[ ! -z $1 && -z $2 ]]; then
    single $1
elif [[ ! -z $1 && ! -z $2 ]]; then
    double $1 $2
else
    echo "error"
fi
