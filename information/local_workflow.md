## LOCAL WORK FLOW

The following information will allow you to run locally the application from either a browser, or an iOS emulator or running the app on your phone via Xcode.

`grunt serve` - run the app from within the app/, on a browser and trigger grunt tasks up on changes in the fileset.

`grunt build` - perform various build related tasks and copies processed source to www/ (clean, minify, inject dependencies etc.,)

`grunt docs` - generate documentation from the dockblocks of the AngularJS source code

`grunt test` - run karma unit tests

`cordova platforms ls` -  lists the installed platforms and available ones

`cordova platforms add ios` - adds the platform ios to the build proccess

`cordova emulate ios` - loads the app and run it on the ios emulator, should you have properly installed the latest version of Xcode.

### TYPICAL WORKFLOW

```
grunt serve
grunt build
cordova emulate ios
```

### LOADING WITHIN YOUR IPHONE
For this you will need a developer account and will have to run the `grunt build` to make sure that you have the latest version.

 - Find the `hrx.xcodeproj` file in the directory `/platforms/ios/` using finder. 
 - Double click it to load it using Xcode. Connect your iPhone to your machine. 
 - Then next to the play and stop button on the right of hrx click and select 
 - your iPhone name.
 - Click play.
 - Make sure that your credentials are properly set up and that your iphone is open and not locked up.


#### References
https://www.npmjs.com/package/generator-angularjs-cordova
