@echo off
hugo version 2>nul ^
|| (choco -v 2>nul && choco install hugo) ^
|| (@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin" && choco install hugo)
set /p input=Please input your project name:
hugo new site %input%
cd %input%
git init
git submodule  add -- "https://rdc.hand-china.com/gitlab/rdc-hep/hep-docs-theme.git" "themes/hep-docs-theme"
cd themes/hep-docs-theme
git checkout master
git pull
cd ../..
copy themes\hep-docs-theme\example\config.toml .
copy themes\hep-docs-theme\example\.gitignore .
copy themes\hep-docs-theme\example\index.md content
copy themes\hep-docs-theme\archetypes\default.md archetypes
mkdir data\menu
copy themes\hep-docs-theme\example\menu.toml data\menu
set /p var=Preview now?[y/n]
if %var% == y (
   hugo server
)
if %var% == Y (
   hugo server
)

pause
