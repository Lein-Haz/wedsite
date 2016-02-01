# Wed Site
Everyone's getting hitched in October.

# About
Nick: [www.github.com/ncivili](https://github.com/ncivili)<br>
Phil: [www.github.com/Lein-Haz](https://github.com/Lein-Haz)<br>

## Download
```bash
git clone https://github.com/Lein-Haz/ng-gulp-karma-boilerplate.git
```

## 1. Setup: Node
```bash
npm install
```
- install all of projects npm dependencies

## 2. Setup: Bower
```bash
npm install
```
- install bower dependencies

## 3. Build Development version
```bash
gulp
```
- this will process following tasks:
 * 1. clean /build folder
 * 2. copy bower files to /build folder
 * 3. compile SASS files, minify and uncss compiled css
 * 4. copy and minimize images
 * 5. minify and copy all HTML files into $templateCache
 * 6. build index.html
 * 7. copy fonts
 * 8. run karma unit tests
 * 9. show build folder size
 * 10. launch BrowserSync and start watching for file changes

## Start file watch
```bash
gulp watch
```
Run this command to start BrowserSync serve and watch without going through build first.
**Note:** This is in case you inadvertently stopped BrowserSync, a build has to be run prior to using
 this command by itself.
- all file within /src will be watched for changes and injected into browser thanks to BrowserSync
- a recovery command that is merely step 10 of the above `gulp` command, if BrowserSync stops for some reason


## Changelog(DD.MM.YYYY)
### 0.10.0
- Clone of https://github.com/Lein-Haz/ng-gulp-karma-boilerplate same issues
31.01.2016


