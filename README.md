# Puner Awaaz - Online Radio Service

![example workflow](https://github.com/bkrajendra/puneriawaaz/actions/workflows/build.yml/badge.svg)


![image info](./raw/logo.jpg)

This repository is starting point for BKs to create radio application.

---

## Instructions

Use following instructions for setting up environment.

### Requirements

1. NodeJS -> https://nodejs.org/en/
2. Ionic CLI -> `npm i -g @ionic/cli`
3. Android Studio -> https://developer.android.com/studio (Might need JDK)
4. IDE - Visual Studio Code -> https://code.visualstudio.com/

### Setting up environment

1. `git clone https://github.com/bkrajendra/puneriawaaz.git`
2. `cd puneriawaaz`
3. `npm i`

Follow the below steps to start the dev server, compile the app for Android/iOS 
and compiling it for the Web.
**Make sure you are in the project **root** directory at all times.**

### Starting the Development Server

1. `ionic serve`

This will start compiling the application. Once it's finished it will open
up a window in your browser (http://localhost:8100) where you can preview
the application in the web and play around with it.

### Build the app for Android/iOS

1. `ionic cordova platform add android`
2. `ionic cordova platform add ios`

This will add platform support for android and ios. On windows you can only build for android.
Make sure you have android studio installed and configured.

### Build
`ionic cordova build android`
apk can be found at 
```
platforms\android\app\build\outputs\apk\debug\app-debug.apk 
```


### Run
To install and run apk on mobile, 
1. Attach your phone with data cable to your laptop.
2. run `adb devices` to list your phone in the list.
3. Accept the prompt on your mobile to authorize the device.
4. Run application with `ionic cordova run android`

### Build the app for the Web.

1. `ionic build`

This will build the app simply and put the built contents into the 'www' directory.

* Go to the 'www' directory of the project that Ionic has generated and compress it into a zip.
* Upload the zip to a web server or some sort of localhost or an http server as it cannot run locally.
* Then unzip it and open the 'index.html' file of the built contents in a web browser.
This will be pretty much same as the development server, only now you can distribute it.