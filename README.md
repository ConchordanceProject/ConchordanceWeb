ConchordanceWeb
===============

A webapp for exploring chord fingerings for any fretted instrument.

## Dev Setup
1. ``` npm install ```
2. Create app.conf.js with: 
```javascript
module.exports = {
	db: 'mongodb://<user>:<password>@<url>',
	express: 'express_session_secret'
};
```
3. ``` npm start ```
