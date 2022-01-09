# Puner Awaaz - Online Radio Service

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

1. `ionic cap add android`
2. `ionic cap build android`

This will open up the IDE for your native project (Android Studio for Android Build and
 Xcode for iOS Build).
Make sure the particular IDE that you're building the app for is installed and
running on your computer. Note that Xcode is only available on MacOS. Android Studio is
available on all three platforms (Windows, Linux and MacOS). Now you can build the app through
your native IDE and use an emulator to preview the actual app on desktop.

### Build the app for the Web.

1. `ionic build`

This will build the app simply and put the built contents into the 'www' directory.

* Go to the 'www' directory of the project that Ionic has generated and compress it into a zip.
* Upload the zip to a web server or some sort of localhost or an http server as it cannot run locally.
* Then unzip it and open the 'index.html' file of the built contents in a web browser.
This will be pretty much same as the development server, only now you can distribute it.