#!/usr/bin/env bash

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
}

npm() {
    case $2 in
    init) npmInit ;;
    *) echo "npm" ;;
    esac
}

single() {
    case $1 in
    -i) menu ;;
    *) echo "[command]" ;;
    esac
}

login(){
    sshpass -p "gg123@#$" ssh -o StrictHostKeyChecking=no root@47.250.56.127
}

double() {
    case "$1$2" in
    local-run) nodemon server.js --ignore cookies.json ;;
    git-push) push ;;
    server-login) login -t 'cd /root/makuro' ;;
    server-ls) login -t "cd /root/makuro/ytb && ls" ;;
    *) echo "[command] [param]" ;;
    esac
}

[[ -z $1 && -z $2 ]] && menu || [[ ! -z $1 && -z $2 ]] && single $1 || double $1 $2
