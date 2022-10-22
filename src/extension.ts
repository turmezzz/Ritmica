// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import debounce = require('lodash.debounce');

let listener: EditorListener;
let start: number;
let mpv = require('node-mpv');
let mpvPlayer = new mpv({ "audio_only": true, "auto_restart": true });
let music_started = false;
let isActive: boolean;

const stat_period_duration = 5 * 1000;
const weighted_coef = 0.8;

const enable_log = false;
function log(msg: String) {
    if (enable_log) {
        console.log(msg);
    }
}

//The variable below will just make it so the user cannot run the setInterval method more than once at a time
var isSetTimmeoutRunning = false;
var interval = setInterval(function () {
}, 1000);

function startBackground() {
    //We set this variable to true when we first run the setInterval method.
    //It will get set back to false when the user clicks the stop button
    isSetTimmeoutRunning = true;
    interval = setInterval(function () {
        listener.adjust_speed();
    }, 1000);
}

//Our function to clear the setInterval() method above
function stopBackground() {
    clearInterval(interval);
    isSetTimmeoutRunning = false;
}

function stopMusic() {
    if (music_started) {
        music_started = false;
        mpvPlayer.stop();
        vscode.window.showInformationMessage('Music is stoped');
    }
}

export function activate(context: vscode.ExtensionContext) {

    log('Initializing "ritmica" extension');

    // is the extension activated? yes by default.
    isActive = context.globalState.get('ritmica', true);

    // to avoid multiple different instances
    listener = listener || new EditorListener();

    vscode.commands.registerCommand('ritmica.enable', () => {
        if (!isActive) {
            context.globalState.update('ritmica', true);
            isActive = true;
            vscode.window.showInformationMessage('Ritmica extension enabled');
        } else {
            vscode.window.showInformationMessage('Ritmica extension is already enabled');
        }
    });
    vscode.commands.registerCommand('ritmica.disable', () => {
        if (isActive) {
            isActive = false;
            stopMusic();
            stopBackground();
            vscode.window.showInformationMessage('Ritmica extension disabled');
        } else {
            vscode.window.showInformationMessage('Ritmica extension is already disabled');
        }
    });

    vscode.commands.registerCommand('ritmica.run', async () => {
        if (isActive) {
            music_started = true;
            let input = await vscode.window.showInputBox();
            mpvPlayer.loadStream(input);
            start = Date.now();
            startBackground();
            vscode.window.showInformationMessage('Music is started');
            log("music is started");
        }
    });

    vscode.commands.registerCommand('ritmica.stop', () => {
        if (isActive) {
            stopMusic();
        }
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(listener);
}

// this method is called when your extension is deactivated
export function deactivate() {
    mpvPlayer = null
}

/**
 * Listen to editor changes and play a sound when a key is pressed.
 */
export class EditorListener {
    private _current_temp = 0;
    private _current_period = 0;
    private _music_started = false;

    private _disposable: vscode.Disposable;
    private _subscriptions: vscode.Disposable[] = [];
    private _basePath: string = path.join(__dirname, '..');
    private _average_temp = 20;

    constructor() {
        vscode.workspace.onDidChangeTextDocument(this._keystrokeCallback, this, this._subscriptions);
        vscode.window.onDidChangeTextEditorSelection(this._arrowKeysCallback, this, this._subscriptions);
        this._disposable = vscode.Disposable.from(...this._subscriptions);
    }

    map_temp_to_interval(temp: number) {
        if (temp < 10) {
            return 0.8;
        } else if (temp < 20) {
            return 1;
        } else if (temp < 50) {
            return 1.2;
        } else {
            return 1.4;
        }
    }

    adjust_speed() {
        // Check of starting new stat period
        let new_period = Math.round((Date.now() - start) / stat_period_duration);

        if (new_period != this._current_period) {
            let scale = this.map_temp_to_interval(this._average_temp);
            log("Temp " + this._average_temp);
            log("Temp cur " + this._current_temp);
            log("Scale" + scale);
            log("\n");
            mpvPlayer.speed(scale);
            this._current_period = new_period;
            this._average_temp = Math.round(weighted_coef * this._average_temp + (1 - weighted_coef) * this._current_temp);
            this._current_temp = 0;
        } else {
            this._current_temp = this._current_temp + 1;
        }
    }

    _keystrokeCallback = debounce((event: vscode.TextDocumentChangeEvent) => {
        if (!isActive) {
            return;
        }
        let activeDocument = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
        if (event.document !== activeDocument || event.contentChanges.length === 0) {
            return;
        }
        this.adjust_speed();
    }, 100, {leading: true});

    _arrowKeysCallback = debounce((event: vscode.TextEditorSelectionChangeEvent) => {
        if (!isActive) {
            return;
        }
        // current editor
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document !== event.textEditor.document) {
            return;
        }
        this.adjust_speed();
    }, 100, {leading: true});

    dispose() {
        this._disposable.dispose();
        stopMusic()
    }
}
