var util = require('util');
var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var StovePipeCharacteristic = function(canvas) {
    this.canvas = canvas;
    StovePipeCharacteristic.super_.call(this, {
        uuid: 'ec0e',
        properties: ['read', 'write', 'notify'],
        value: null
    });

    this._updateValueCallback = null;
};

util.inherits(StovePipeCharacteristic, BlenoCharacteristic);

StovePipeCharacteristic.prototype.onReadRequest = function (offset, callback) {
    console.log('EchoCharacteristic - onReadRequest: value = ' + this.canvas.animations.length);

    callback(this.RESULT_SUCCESS, new Buffer([this.canvas.animations.length]));
};

StovePipeCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    this._value = data;

    console.log('EchoCharacteristic - onWriteRequest: value = ' + this.canvas.animations.length);

    if (this._updateValueCallback) {
        console.log('EchoCharacteristic - onWriteRequest: notifying');

        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};

StovePipeCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe');

    this._updateValueCallback = updateValueCallback;
};

StovePipeCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe');

    this._updateValueCallback = null;
};

module.exports = StovePipeCharacteristic;
