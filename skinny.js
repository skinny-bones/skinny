var events = require('events'),
    util   = require('util');

function Skinny() {
    events.EventEmitter.call(this);
}

util.inherits(Skinny, events.EventEmitter);

Skinny.prototype.attach = function(bone, options) {
    bone(this, options);
};

Skinny.prototype.newSkinny = function() {
    return new Skinny();
};

//skinny.setMaxListeners(0);

module.exports = new Skinny();