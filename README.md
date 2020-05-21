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

Simply press CTRL+C and start Ninjadog again if you're running it through a command prompt.

If you are running Ninjadog as a service, you need to open the Task Manager, go to the Services tab, and right-click `ninjadog.exe` and choose _Restart_.

# Installing service

To install Ninjadog as a service, run:

```
ninjadog service install
```

# Uninstalling

To do this, open PowerShell as Administrator and run:

```
npm remove -g ninjadog
```

If you're running Ninjadog as a service, you _first_ need to remove the service:

```
sc delete ninjadog
```

Then run the uninstall command above.

# Configuration

The ninjadog configuration is stored in `%USERPROFILE%/AppData/Roaming/ninjadog/settings.json`

You might want to install some Ninjadog plugins before editing this file and running the program.

You need to restart the program after changing the settings.

# Plugins

Install a plugin just like you installed Ninjadog:

```
npm install -g <plugin name>
```

You need to restart the program after installing a plugin.

| Name                                                                                        | Description                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [ninjadog-plugin-logger](https://github.com/niclaslindstedt/ninjadog-plugin-logger)\*       | Log events to webserver and filesystem           |
| [ninjadog-plugin-webserver](https://github.com/niclaslindstedt/ninjadog-plugin-webserver)\* | Web UI for Ninjadog                              |
| [ninjadog-plugin-qbittorrent](https://github.com/niclaslindstedt/ninjadog-plugin-qb)        | Access qbittorrent                               |
| [ninjadog-plugin-files](https://github.com/niclaslindstedt/ninjadog-plugin-qbfilemon)       | Monitor file system and add tnt files to qb      |
| [ninjadog-plugin-rssfeed](https://github.com/niclaslindstedt/ninjadog-plugin-rssreader)     | Download tnt files using rss feeds               |

\* Is installed by installing Ninjadog

# Typical use case

You want Ninjadog to:

- Be served through the web
- Log events
- Download torrents through an RSS feed
- Monitor a folder on your harddrive for torrent files (recursively) and add them to qBitTorrent when found

To do this, run the following:

```
npm install -g ninjadog
npm install -g ninjadog-plugin-webserver
npm install -g ninjadog-plugin-logger
npm install -g ninjadog-plugin-qb
npm install -g ninjadog-plugin-qbfilemon
npm install -g ninjadog-plugin-rssfeed
```

The webserver plugin serves ninjadog on port 8585.

Then edit your settings.json file (with [VS Code](https://code.visualstudio.com/)):

```
code %APPDATA%/ninjadog/settings.json
```

Then install ninjadog as a service:

```
ninjadog service install
```

Et voilà!
