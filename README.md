# ng-gulp-boilerplate
An extended AngularJS Boilerplate to kick off new projects, with SASS, Karma-Jasmine integration and Gulp watch/build tasks

# Features
* SASS and karma integerated into build process
* Gulp watch, build and local server tasks
* folder structure pattern to build off of

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


## Changelog
### 0.10.0
- First release, build working compile needs work<br>
31.01.2016


