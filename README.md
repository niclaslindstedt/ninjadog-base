# About

Ninjakatt is a collection of useful plugins that you can run on your computer and make your digital life easier. This repository contains the main application that ties all the plugins together and allows them to communicate with eachother.

# Installing

Open a PowerShell prompt as Administrator, and type:

```
npm install -g ninjakatt
```

# Running

```
ninjakatt
```

# Installing service

To install Ninjakatt as a service, run:

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

The Ninjakatt configuration is stored in `%USERPROFILE%/AppData/Roaming/ninjakatt/settings.json`

You might want to install some ninjakatt plugins before editing this file and running the program.

# Plugins

Install a plugin just like you installed ninjakatt:

```
npm install -g <plugin name>
```

Name | Description
--- | ---
[ninjakatt-plugin-base](https://github.com/lindstrm/ninjakatt-plugin-base) | The base system\*
[ninjakatt-plugin-files](https://github.com/lindstrm/ninjakatt-plugin-files) | Write and read files
[ninjakatt-plugin-logger](https://github.com/lindstrm/ninjakatt-plugin-logger) | Log events
[ninjakatt-plugin-webserver](https://github.com/lindstrm/ninjakatt-plugin-webserver) | Allows access to ninjakatt through a web browser
[ninjakatt-plugin-kodi](https://github.com/lindstrm/ninjakatt-plugin-kodi) | API for Kodi
[ninjakatt-plugin-qbittorrent](https://github.com/lindstrm/ninjakatt-plugin-qbittorrent) | API for qBitTorrent
[ninjakatt-plugin-torrentrss](https://github.com/lindstrm/ninjakatt-plugin-torrentrss) | Download torrent files through rss feeds
[ninjakatt-plugin-epcheckr](https://github.com/lindstrm/ninjakatt-plugin-epcheckr) | API for epcheckr

\* Is installed by installing ninjakatt
