# c9.ide.desktop
Adds a desktop GUI to cloud9's ide using x11 and [fjakobs'](https://github.com/fjakobs/cloud9-vnc) approach to setting up cloud9 with vnc.

All I am doing is wrapping it up into a cloud9 plugin and exposing options to the editor. (Shortcut to open up a desktop tab).

**Please Note: That this plugin only works on ubuntu systems if using the c9sdk and the official c9.io platform**

# What is this used for
Any programs that need a gui interface to write out to, such as Python's turtle package, can use this approach to develop and test in cloud9.


# Commands

Open Desktop in new Tab:
MAC: `COMMAND-SHIFT-ALT-D`
WIN: `CTRL-SHIFT-ALT-D`

# Installation

use command `c9 install c9.ide.desktop` and then reload your editor.

In order to use custom plugins during alpha you need to change some settings in your c9 workspace.

Go to `Cloud9>Preferences>Experimental>SDK` and enable the two toggles for `Load Plugins From Workspace` and `Load Custom Plugins`. That should do the trick!

**Please Note: That this will install needed packages automatically. Any issues please file an issue here at github**


# Usage

There are two commands that are built into the editor. These are accessible under the view menu at the top of the ide.

![c9 view menu location](https://raw.githubusercontent.com/shadowcodex/c9.ide.desktop/master/c9_view.png)

The Restart Command will run the supervisor command and start the system.

The Open Desktop Command will open the VNC connection in a new tab allowing you to view your x11 desktop.

# Screen Shots