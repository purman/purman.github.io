#!/bin/bash  
read -p "please input your project name:" input  

if ! (type hugo 2>&1 >/dev/null); then
    brew install hugo || sudo apt-get install hugo || sudo dnf install hugo || sudo yum install hugo || sudo pacman -S hugo
fi
echo "Create projects and download themes"
hugo new site ${input} 2>&1 >/dev/null
cd ${input}
git init 2>&1 >/dev/null
git submodule  add -- "https://github.com/purman/wzero-theme.git" "themes/wzero-theme" 2>&1 >/dev/null
cd themes/wzero-theme
git checkout master 2>&1 >/dev/null
git pull 2>&1 >/dev/null
cd ../..
cp themes/wzero-theme/example/config.toml . 
cp themes/wzero-theme/example/index.md content 
cp themes/wzero-theme/archetypes/default.md archetypes 
mkdir data/menu/
cp themes/wzero-theme/example/menu.toml data/menu
read -p "Preview now?[y/n]" pre
if [[ ${pre} = "Y" ]] || [[ ${pre} = "y" ]]; then
	hugo server
fi 