# About

Ninjadog is a collection of useful plugins that you can run on your computer and make your digital life easier. This repository contains the main application that ties all the plugins together and allows them to communicate with each other.

# Installing

Open a PowerShell prompt as Administrator, and type:

```
npm install -g ninjadog
```

# Running

```
ninjadog
```

# Restarting

Simply press CTRL+C and start ninjadog again if you're running it through a command prompt.

If you are running ninjadog as a service, you need to open the Task Manager, go to the Services tab, and right-click `ninjadog.exe` and choose _Restart_.

# Installing service

To install ninjadog as a service, run:

```
ninjadog service install
```

# Uninstalling

To do this, open PowerShell as Administrator and run:

```
npm remove -g ninjadog
```

If you're running ninjadog as a service, you _first_ need to remove the service:

```
sc delete ninjadog
```

Then run the uninstall command above.

# Configuration

The ninjadog configuration is stored in `%USERPROFILE%/AppData/Roaming/ninjadog/settings.json`

You might want to install some ninjadog plugins before editing this file and running the program.

You need to restart the program after changing the settings.

# Plugins

Install a plugin just like you installed ninjadog:

```
npm install -g <plugin name>
```

You need to restart the program after installing a plugin.

| Name                                                                                   | Description                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [ninjadog-plugin-files](https://github.com/lindstrm/ninjadog-plugin-files)             | Watch file system for changes and trigger events |
| [ninjadog-plugin-logger](https://github.com/lindstrm/ninjadog-plugin-logger)           | Log events                                       |
| [ninjadog-plugin-webserver](https://github.com/lindstrm/ninjadog-plugin-webserver)     | Allows access to ninjadog through a web browser  |
| [ninjadog-plugin-kodi](https://github.com/lindstrm/ninjadog-plugin-kodi)               | API for Kodi                                     |
| [ninjadog-plugin-qbittorrent](https://github.com/lindstrm/ninjadog-plugin-qbittorrent) | API for qBitTorrent                              |
| [ninjadog-plugin-rssfeed](https://github.com/lindstrm/ninjadog-plugin-rssfeed)         | Download torrent files through rss feeds         |
| [ninjadog-plugin-epcheckr](https://github.com/lindstrm/ninjadog-plugin-epcheckr)       | API for epcheckr                                 |

\* Is installed by installing ninjadog

# Typical use case

You want ninjadog to:

- Download torrents through an RSS feed
- Monitor a folder on your harddrive for torrent files (recursively) and add them to qBitTorrent when found
- Be served through the web
- Log events

To do this, run the following:

```
npm install -g ninjadog
npm install -g ninjadog-plugin-rssfeed
npm install -g ninjadog-plugin-qbittorrent
npm install -g ninjadog-plugin-webserver
npm install -g ninjadog-plugin-logger
```

The webserver plugin serves ninjadog on port 8585.

Then edit your settings.json file (with [VS Code](https://code.visualstudio.com/)):

```
code %USERPROFILE%/AppData/Roaming/ninjadog/settings.json
```

Then install ninjadog as a service:

```
ninjadog service install
```

Et voilà!
