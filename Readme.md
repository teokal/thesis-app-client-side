#Admin Dashboard Template

This Admin Dashboard Template is based in the original app made in the examples of ExtJS
Framework, the idea of this is to use it as a real "template" to generate a application
based on the original Admin Dashboard app.

If you are like me, and tried to do a new app based on the sample but ended with a "Admin"
app everywhere (the sencha generate command didn't replaced the Admin name with the correct
App Name) then this repository is for you.

Just clone in a directory and then run the command (from the framework) to create a new
App based from this template as follows:

    sencha generate app -s Path_To_The_Downloaded_Template YourAppName Path_To_The_Destination_App

Enjoy!

Let me know any suggestion you may have and happy coding

[syscobra](http://www.twitter.com/syscobra)

# Original Readme
# Admin Dashboard

The Admin Dashboard is an application template for you to copy and adapt to suite
your specific needs. While you can remove the files and folders that your application
does not use, be sure to read below before deciding what can be deleted and what needs
to be kept in source control.

The following files are all needed to build and load the application.

 - `"app.js"` - The file that launches the application. This is primarily used to
   launch an instance of the `Admin.Application` class.
 - `"app.json"` - The application descriptor which controls how the application is
   built and loaded.
 - `"index.html"` - The default web page for this application. This can be customized
   in `"app.json"`.
 - `"build.xml"` - The entry point for Sencha Cmd to access the generated build
   script. This file is a place where you can hook into these processes and tune
   them. See the comments in that file for more information.
 - `".sencha"` - This (typically hidden) folder contains the generated build scripts
   and configuration files for the application. This folder is required in order to
   build the application but its content should not need to be edited in most cases.
   The content of this folder is updated by "sencha app upgrade".

These files can be ignored from source control as they are regenerated by the build
process.

 - `"build"` - This folder contain the output of the build. The generated CSS file,
   consolidated resources and concatenated JavaScript file are all stored in this
   folder.
 - `"bootstrap.*"` - These files are generated by the build and watch commands to
   enable the application to load in "development mode".

# Other Folders

## Application Structure

This application is a Universal Application. The following folders contain the code,
resources, etc. that are shared by both Classic and Modern build profiles.

    app/                # Contains JavaScript code
        model/          # Data model classes
        view/           # Views as well as ViewModels and ViewControllers
        store/          # Data stores
        controller/     # Global / application-level controllers

    overrides/          # JavaScript code that is automatically required

    sass/
        etc/            # Misc Sass code (all.scss is imported by default)
        var/            # Sass variable and mixin declarations
        src/            # Sass rules

    resources/          # Assets such as images, fonts, etc.

See the [Sass readme](sass/Readme.md) for details on the "sass" folder.

The following additional directories are used to isolate code and other files that are
toolkit-specific:

    classic/                # Content specific to the classic toolkit
        src/
            model/          # Data model classes
            view/           # Views as well as ViewModels and ViewControllers
            store/          # Data stores
            controller/     # Global / application-level controllers

        overrides/          # JavaScript code that is automatically required

        sass/
            etc/            # Misc Sass code (all.scss is imported by default)
            var/            # Sass variable and mixin declarations
            src/            # Sass rules

        resources/          # Assets such as images, fonts, etc.

    modern/                 # Content specific to the modern toolkit
        src/
            model/          # Data model classes
            view/           # Views as well as ViewModels and ViewControllers
            store/          # Data stores
            controller/     # Global / application-level controllers

        overrides/          # JavaScript code that is automatically required

        sass/
            etc/            # Misc Sass code (all.scss is imported by default)
            var/            # Sass variable and mixin declarations
            src/            # Sass rules

        resources/          # Assets such as images, fonts, etc.

## Overrides

The contents of "overrides" folders are automatically required and included in
builds. These should not be explicitly mentioned in "requires" or "uses" in code.
This area is intended for overrides like these:

    Ext.define('Admin.overrides.foo.Bar', {
        override: 'Ext.foo.Bar',
        ...
    });

Such overrides, while automatically required, will only be included if their target
class ("Ext.foo.Bar" in this case) is also required. This simplifies applying
patches or extensions to other classes.
