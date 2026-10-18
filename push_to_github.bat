@echo off
chcp 65001 >nul
echo ========================================================
echo   霞鹜文楷 for Gemini ^& ChatGPT - GitHub 一键推送脚本
echo ========================================================
echo.
set /p REPO_URL="请输入你在 GitHub 创建的仓库地址 (例如 https://github.com/你的用户名/lxgw-wenkai-gemini-chatgpt.git): "
if "%REPO_URL%"=="" (
    echo 仓库地址不能为空！
    pause
    exit /b 1
)

git init
git add manifest.json styles.css content.js popup.html popup.js README.md LICENSE .gitignore icons/
git commit -m "feat: initial release of LXGW WenKai Chrome extension (v2.1.0) for Gemini & ChatGPT"
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo 推送完成！
pause
