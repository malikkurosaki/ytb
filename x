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
    $login -t "cd /root/makuro/ytb && git pull -f origin main && source ~/.nvm/nvm.sh && npm install "

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
    local-start) nodemon controller/jalankan.js --ignore cookies.json ;;
    server-login) $login ;;
    server-ls) $login -t "cd /root/makuro/ytb && ls " ;;
    server-start) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 start controller/jalankan.js --name ytb" ;;
    server-status) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 status" ;;
    server-restart) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 restart all " ;;
    server-log) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 logs" ;;
    server-stop) $login -t "cd /root/makuro/ytb && source ~/.nvm/nvm.sh && pm2 stop ytb" ;;
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
