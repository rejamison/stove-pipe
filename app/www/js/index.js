/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    BT_DEVICE_NAME: 'stove-pipe',

    animationCharacteristic: null,
    service: null,
    device: null,

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log("onDeviceReady: Binding UI elements.");
        var that = this;
        $('#connect_button').click(function() {
            console.log("connect_button.click(): scanning for BLE devices");
            evothings.ble.startScan(
                function(device)
                {
                    console.log("startScan: found device: " + JSON.stringify(device));
                    if(device.name === that.BT_DEVICE_NAME) {
                        console.log('startScan found device named: ' + JSON.stringify(device));
                        $('#connect_button').prop("disabled", true);
                        $('#connect_button').html('Connecting...');

                        that.device = device;
                        evothings.ble.stopScan();

                        evothings.ble.connectToDevice(
                            that.device,
                            function(device) {
                                console.log('connectToDevice connected to: ' + JSON.stringify(device));
                                that.service = evothings.ble.getService(device, 'EC00');
                                that.animationCharacteristic = evothings.ble.getCharacteristic(that.service, 'EC0E');

                                evothings.ble.readCharacteristic(
                                    that.device,
                                    that.animationCharacteristic,
                                    function(data) {
                                        var value = new DataView(data).getUint8(0);
                                        console.log('readCharacteristic: received value: ' + value);
                                        $('.animation_button').attr('disabled', false);
                                        $('.animation_button[data-animation-index=' + value + ']').attr('disabled', true);
                                    },
                                    function(error) {
                                        console.log('ERROR: readCharacteristic: ' + JSON.stringify(error));
                                    }
                                );
                                evothings.ble.enableNotification(
                                    that.device,
                                    that.animationCharacteristic,
                                    function(data) {
                                        var value = new DataView(data).getUint8(0);
                                        console.log('receiveNotification: received value: ' + value);
                                        $('.animation_button').attr('disabled', false);
                                        $('.animation_button[data-animation-index=' + value + ']').attr('disabled', true);
                                    },
                                    function(error) {
                                        console.log('ERROR: enableNotification: ' + JSON.stringify(error));
                                    }
                                );

                                // enable the animation buttons, disable the connect button
                                $('#connect_button').prop("disabled", true);
                                $('#connect_button').html('Connected');
                                $('.animation_button').click(function() {
                                    var value = parseInt($(this).data('animation-index'));
                                    console.log('animation_button.click(): writing characteristic value: ' + value);
                                    var element = $(this);
                                    evothings.ble.writeCharacteristic(
                                        that.device,
                                        that.animationCharacteristic,
                                        new Uint8Array([value]),
                                        function() {
                                            // do nothing, wait for the notification to update the UI
                                        },
                                        function(error) {
                                            console.log('ERROR: writeCharacteristic: ' + JSON.stringify(error));
                                        }
                                    );
                                });
                                $('.animation_button').prop("disabled", false);
                            },
                            function(device) {
                                console.log('connectToDevice disconnected from: ' + JSON.stringify(device));
                            },
                            function(error) {
                                console.log('ERROR: connectToDevice: ' + JSON.stringify(error));
                            }
                        );
                    }
                },
                function(error)
                {
                    console.log('ERROR: startScan: ' + JSON.stringify(error));
                }
            );
        });
    }
};

function findElementWithData(selector, key, value, callback) {
    $(selector).forEach(function() {
       if($(this).data(key) === value) {
           callback($(this));
       }
    });
    callback(null);
}

app.initialize();