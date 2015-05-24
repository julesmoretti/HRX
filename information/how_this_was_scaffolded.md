**HOW THIS PLATFORM WAS SCAFFOLDED**

This is how this platform was setup before entering any new line of codes. Following these steps will recreate an empty app that will be deployable again. But this is only for reference should you wish to build another app from scratch.

For information on how to download and run the latest version of the HRX app please read the `github_workflow.txt`



*THEREFORE TO GENERATE AN ANGULARJS WITH CORDOVA*

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

*References*
https://www.npmjs.com/package/generator-angularjs-cordova
