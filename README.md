I referred to this video
https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

To use this application, 

1. make dev.js file inside config folder 
2. put mongoDB info into dev.js file 
3. Type "npm install" inside the root directory  ( Download Server Dependencies ) 
4. Type "npm install" inside the client directory ( Download Front-end Dependencies )
5. Sign Up themoviedb and get API Key. If you get the API Key, put it into client > src > components > Config.js

Error Solution 
1. npm install error :
  1) delete package-lock.json
  2) npm init
  3) npm i --save


