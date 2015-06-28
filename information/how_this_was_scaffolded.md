## HOW THIS PLATFORM WAS SCAFFOLDED

This is how this platform was setup before entering any new line of codes. Following these steps will recreate an empty app that will be deployable again. But this is only for reference should you wish to build another app from scratch.

For information on how to download and run the latest version of the HRX app please read the `github_workflow.txt`



### THEREFORE TO GENERATE AN ANGULARJS WITH CORDOVA

Load the Terminal Application and make sure that you are then in the user directory by typing `cd ~` and enter.

Then run each line of code separately.

```
npm install -g yo
npm install -g generator-angularjs-cordova
```

Then from wherever you want the folder to be while navigating in your terminal run the following lines:

```
mkdir hrx && cd hrx
yo angularjs-cordova
```

Options used for throughout the process:
<i>uses spaces to check or uncheck selections</i>

 - ? What is the name of your app? (Spaces aren't allowed):
   - hrx

 - ? App Id? (Reverse domain style. e.g com.package.name):
io.hrxclub.hrx

 - ? What platforms would you like to add support for? (Please ensure you have the correctly installed the platform requirements):
   - iOS

 - ? What plugins would you like to include by default? (X is selected. Press space to toggle)
   - Splashscreen
   - Network Information
   - Accelerometer (Device motion)
   - Accelerometer (Device orientation)
   - Contacts
   - Geolocation
   - In App Browser
   - Media
   - Media Capture
   - Access files on device

 - ? What would you like to call your AngularJs application?
   - HRX

 - ? How would you describe your application?
   - Hack Reactor App built with Cordova and Angular

 - ? How would you describe your application in comma seperated key words?
   - Cordova, AngularJS, Hack Reactor, Alumni, MYSQL, gitHub, LinkedIN

 - ? What is your company/author name?
   - Hack Reactor/Jules Moretti

 - ? Which additional AngularJS modules would you like to include?
   - ngCookies, ngAnimate, ngTouch, ngSanitize

### ADDING SASS TO THE WORKFLOW

```
npm install grunt-contrib-watch
npm install grunt-sass
```

In the `Gruntfile.js > grunt.initConfig` added:

```
watch: {

    sass: {
      files: ['<%= yeoman.app %>/sass/**/*.{scss,sass}','<%= yeoman.app %>/sass/_partials/**/*.{scss,sass}'],
      tasks: ['sass:app']
    },

    ...
},
sass: {
  options: {
    sourceMap: false,
    // outputStyle: 'compressed' // gets rid of white spaces
    outputStyle: 'expanded' // allows for readability
  },
  app: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.app %>/sass',
      src: ['*.scss'],
      dest: '<%= yeoman.app %>/css',
      ext: '.css'
    }]
  }
},

...
```

This ensures that `*.scss` files from within the `/sass` are converted to `*.css` and placed into the `/css` directory.

As is the files will be generated is watch picks up on a file change, so to make sure these are automatically converted on a grunt task lets add it in a couple of places:

```
grunt.registerTask('serve', function(target) {

    ...

    grunt.task.run([
        'clean:server',
        'sass',
        
        ...
    ]);
});
```

and

```
grunt.registerTask('build', [
    'clean:dist',
    'sass',
    
    ...
]);
```

and

```
grunt.registerTask('default', [
    'newer:jshint',
    'sass',
    
    ...
]);
```


### ADDING BROWSERSYNC TO THE WORKFLOW

```
npm install grunt-browser-sync --save-dev
```


Then add to `Gulpfile.js` > `grunt.initConfig`

```
grunt.initConfig({

    ...

    sass: {
        ...
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'app/css/*.css',
            'app/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './app'
        }
      }
    },

    ...
```

and also

```
grunt.registerTask('serve', function(target) {
    ...
    grunt.task.run([
        ...
        'sass',
        'browserSync', // allows to share preview across network
        ...
        // 'connect:livereload', // remove duplicate load from browsersSync
        'watch'
    ]);
});
```


*References*
https://www.npmjs.com/package/generator-angularjs-cordova
http://benfrain.com/lightning-fast-sass-compiling-with-libsass-node-sass-and-grunt-sass/
http://www.browsersync.io/docs/grunt/
http://www.funnyant.com/angularjs-ui-router/
http://daneden.github.io/animate.css/
http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html
http://support.hockeyapp.net/kb/client-integration-ios-mac-os-x/ios-device-types
http://billpatrianakos.me/blog/2014/04/25/phonegap-for-ios-the-definitive-guide-to-using-custom-fonts/
https://snazzymaps.com
https://github.com/AlexDisler/cordova-icon
https://github.com/AlexDisler/cordova-splash
https://github.com/driftyco/ionic-plugin-keyboard
http://www.raywenderlich.com/32960/apple-push-notification-services-in-ios-6-tutorial-part-1
