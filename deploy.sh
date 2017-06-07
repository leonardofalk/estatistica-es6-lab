#!/bin/bash
webpack -p
cp index.html $HOME/front/leonardofalk.github.com/stats/
cp -r public/ $HOME/front/leonardofalk.github.com/stats/
cd $HOME/front/leonardofalk.github.com/stats/
git add -A
git commit -m 'Automatic deploy from leonardofalk/stats'
git push origin master
