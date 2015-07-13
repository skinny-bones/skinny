"use strict";

const events = require('events');

class Skinny extends events.EventEmitter {
    attach(bone, options, path) {
        if (Array.isArray(bone)) {
            let bones = bone;
            for (let bone of bones) {
                let boneOptions;

                if (options && typeof bone === 'string') {
                    boneOptions = options[bone];
                }

                attachSkinnyBone(this, bone, boneOptions, path);
            }
        } else {
            attachSkinnyBone(this, bone, options, path);
        }
    }

    newSkinny() {
        return new Skinny();
    }

    reset() {
        this.removeAllListeners();
        for (let property in this) {
            if (this.hasOwnProperty(property)) {
                delete this[property];
            }
        }
    }
}

function attachSkinnyBone(skinny, bone, options, path) {
    if (typeof bone === 'string') {
        bone = require(path ?  path + '/' + bone : `skinny-bone-${camelCaseToDash(bone)}`);
    }

    bone(skinny, options);
}

function camelCaseToDash(string) {
    return string.replace(/([a-z][A-Z])/g, function (l) {
        return l[0] + '-' + l[1].toLowerCase()
    });
}

//skinny.setMaxListeners(0);

module.exports = new Skinny();