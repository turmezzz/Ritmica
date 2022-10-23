# Ritmica

This Visual Studio Code music plugin to increase concentration during coding. 
Boost your productivity with Ritmica. The IDE plugin changes the speed of the music according to your typing speed. 
This helps you maintain concentration and get into flow state. Try it and become a code hero with Ritmica! 

## Requirements

![Ritmica icon](icon.png)

### Linux

**Linux based**

```sudo apt-get install mpv youtube-dl```

### Mac

```brew  install mpv youtube-dl```

## Installation

Run `code --install-extension ttda.ritmica`

or search [Ritmica](https://marketplace.visualstudio.com/items?itemName=ttda.ritmica) in Extensions Marketplace.

## How to use

### Enable / Disable

Ritmica will start immediately when Visual Studio Code is started. However, you can enable and disable the extension by executing these commands in the Command Palette (Cmd+Shift+P):

- `Ritmica: Enable`
- `Ritmica: Disable`

### Music control

You can play music by executing these commands in the Command Palette (Cmd+Shift+P) and past link to your playlist:

- `Ritmica: Run music`

You can stop music by executing these commands in the Command Palette (Cmd+Shift+P):

- `Ritmica: Stop music`

## Building extension

```npm install vsce```

```vsce package```

## Credits

[Matias Godoy](https://github.com/mattogodoy)
