/*
    KWin - the KDE window manager
    This file is part of the KDE project.

    SPDX-FileCopyrightText: 2014 Thomas Lübking <thomas.luebking@gmail.com>

    SPDX-FileCopyrightText: 2021 Arjen Hiemstra <ahiemstra@heimr.nl>

    SPDX-License-Identifier: GPL-2.0-or-later
*/

function isRelevant(client) {
    return client.maximizable &&
           (client.onAllDesktops || client.desktop === workspace.currentDesktop);
           (!client.activities.length || client.activities.indexOf(workspace.currentActivity.toString()) > -1);
}

function isDeckScreen() {
    if (workspace.numScreens > 1) {
        return false;
    }

    // We cannot get real information about the screen like connector name or
    // other properties, so instead try and determine if this is the deck screen
    // by checking its size.
    let area = workspace.clientArea(KWin.ScreenArea, 0, workspace.currentDesktop)
    if (area.width != 1280 && area.height != 800) {
        return false;
    }

    return true
}

function maximizeClient(client) {
    if (!isRelevant(client)) {
        return;
    }

    if (!isDeckScreen()) {
        return;
    }

    client.setMaximize(true, true)
}

function init() {
    workspace.clientAdded.connect(maximizeClient);
}

init();
