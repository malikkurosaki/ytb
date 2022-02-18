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

double() {
    case "$1$2" in
    git-push) push ;;
    *) echo "[command] [param]" ;;
    esac
}

[[ -z $1 && -z $2 ]] && menu || [[ ! -z $1 && -z $2 ]] && single $1 || double $1 $2
