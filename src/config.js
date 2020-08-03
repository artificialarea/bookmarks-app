export default {
    API_ENDPOINT: `https://arcane-mountain-33411.herokuapp.com/api/bookmarks`,
    // API_ENDPOINT: `http://localhost:8000/api/bookmarks`,
    API_KEY: process.env.REACT_APP_API_KEY,
    // NOTE: in the .env.local 
    // I had to add an 'escape' (\) before every instance of a dollar sign ($) in the API_KEY

}


/* ADDITIONALLY

RE: vercel.json //////////////////////

// originally, per: https://courses.thinkful.com/react-v1/checkpoint/18

{
    "version": 2,
    "routes": [
        { "handle": "filesystem" },
        { "src": "/.*", "dest": "/index.html" }
    ]
}


// changed, per: https://courses.thinkful.com/node-postgres-v1/checkpoint/20#full-stack-bookmarks

{
  "version": 2,
  "routes": [
    {
      "src": "^/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": ".*",
      "dest": "/index.html"
    }
  ]
}



RE: package.json ///////////

// originally

"scripts": {
    "predeploy": "npm run build",
    "deploy": "now ./build",
    "postdeploy": "now alias -A ./build/now.json"
}


// changed, per: https://courses.thinkful.com/node-postgres-v1/checkpoint/20#full-stack-bookmarks

"scripts": {
    "predeploy": "npm run build",
    "deploy": "vercel --prod"
}


*/


