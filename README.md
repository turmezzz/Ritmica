# Ritmica

This Visual Studio Code extension increase concentration during coding. Boost your productivity with Ritmika. The IDE plugin changes the speed of the music according to your typing speed. This helps you maintain concentration and get into flow state. Try it and become a code hero with Ritmica!

## Requirements

### Linux

On Linux, you will need to have mplayer installed and on your PATH to get this extension working.

```npm install ```

```sudo apt-get install mpv youtube-dl```

**Debian based**

```npm install ```

```sudo apt-get install mpv youtube-dl```

**Red Hat based**

No special requirements.

**Arch based**

No special requirements.

### Windows and Mac

No special requirements.

## Installation

Run `code --install-extension danjiii.ritmica`

or search [Ritmica](https://marketplace.visualstudio.com/items?itemName=danjiii.ritmica) in Extensions Marketplace.

## How to use

### Enable / Disable

Ritmica will start immediately when Visual Studio Code is started. However, you can enable and disable the extension by executing these commands in the Command Palette (Cmd+Shift+P):

- `Ritmica: Enable`
- `Ritmica: Disable`

### Volume control

You can adjust the volume of the sounds by executing these commands in the Command Palette (Cmd+Shift+P):

- `Ritmica: Volume Up`
- `Ritmica: Volume Down`
- `Ritmica: Set Volume`

**NOTE:** The volume adjustments only apply to this extension's sounds. It does not affect the system volume.

### Music control

You can play music by executing these commands in the Command Palette (Cmd+Shift+P) and give link to your playlist:

- `Ritmica: Run music`

You can stop music by executing these commands in the Command Palette (Cmd+Shift+P):

- `Ritmica: Stop music`

## Known Issues & Bugs

The extension is in a very early stage. Please report any issues / bugs you find.

## Contributing

Any pull request is welcome.

## Credits

For Windows, this extension uses the `sounder` light-weight player:
<https://www.elifulkerson.com/projects/commandline-wav-player.php>
