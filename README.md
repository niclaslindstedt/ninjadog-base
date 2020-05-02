# About

Ninjakatt is a collection of useful plugins that you can run on your computer and make your digital life easier. This repository contains the main application that ties all the plugins together and allows them to communicate with each other.

# Installing

Open a PowerShell prompt as Administrator, and type:

```
npm install -g ninjakatt
```

# Running

```
ninjakatt
```

# Restarting

Simply press CTRL+C and start ninjakatt again if you're running it through a command prompt.

If you are running ninjakatt as a service, you need to open the Task Manager, go to the Services tab, and right-click `ninjakatt.exe` and choose *Restart*.

# Installing service

To install ninjakatt as a service, run:

```
ninjakatt service install
```

# Uninstalling

To do this, open PowerShell as Administrator and run:

```
npm remove -g ninjakatt
```

If you're running ninjakatt as a service, you *first* need to remove the service:

```
sc delete ninjakatt
```

Then run the uninstall command above.

# Configuration

The ninjakatt configuration is stored in `%USERPROFILE%/AppData/Roaming/ninjakatt/settings.json`

You might want to install some ninjakatt plugins before editing this file and running the program.

You need to restart the program after changing the settings.

# Plugins

Install a plugin just like you installed ninjakatt:

```
npm install -g <plugin name>
```

You need to restart the program after installing a plugin.

Name | Description
--- | ---
[ninjakatt-plugin-files](https://github.com/lindstrm/ninjakatt-plugin-files) | Watch file system for changes and trigger events
[ninjakatt-plugin-logger](https://github.com/lindstrm/ninjakatt-plugin-logger) | Log events
[ninjakatt-plugin-webserver](https://github.com/lindstrm/ninjakatt-plugin-webserver) | Allows access to ninjakatt through a web browser
[ninjakatt-plugin-kodi](https://github.com/lindstrm/ninjakatt-plugin-kodi) | API for Kodi
[ninjakatt-plugin-qbittorrent](https://github.com/lindstrm/ninjakatt-plugin-qbittorrent) | API for qBitTorrent
[ninjakatt-plugin-torrentrss](https://github.com/lindstrm/ninjakatt-plugin-torrentrss) | Download torrent files through rss feeds
[ninjakatt-plugin-epcheckr](https://github.com/lindstrm/ninjakatt-plugin-epcheckr) | API for epcheckr

\* Is installed by installing ninjakatt

# Typical use case

You want ninjakatt to:

* Download torrents through an RSS feed
* Monitor a folder on your harddrive for torrent files (recursively) and add them to qBitTorrent when found
* Be served through the web
* Log events

To do this, run the following:

```
npm install -g ninjakatt
npm install -g ninjakatt-plugin-torrentrss
npm install -g ninjakatt-plugin-qbittorrent
npm install -g ninjakatt-plugin-webserver
npm install -g ninjakatt-plugin-logger
```

The webserver plugin serves ninjakatt on port 8585.

Then edit your settings.json file (with [VS Code](https://code.visualstudio.com/)):

```
code %USERPROFILE%/AppData/Roaming/ninjakatt/settings.json
```

Then install ninjakatt as a service:

```
ninjakatt service install
```

Et voilà!
