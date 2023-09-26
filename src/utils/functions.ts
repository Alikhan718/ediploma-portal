import React from "react";

export function humanReadableToLocalTime(time: string, delimeter: string): string {
    const date = new Date(
        time.replace("Dated on ", "")
            .split(", minute ")[0]
    ).toLocaleDateString("en-GB");
    return date.replaceAll("/", delimeter);
}

const webSocket = new WebSocket('wss://127.0.0.1:13579/');
let callback: any = null;

webSocket.onopen = (event): void => {
    console.log("Connection opened");
};

webSocket.onclose = (event): void => {
    if (event.wasClean) {
        console.log('connection has been closed');
    } else {
        console.log('Connection error');
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};


webSocket.onmessage = (event): void => {
    var result = JSON.parse(event.data);

    if (result != null) {
        var rw = {
            code: result['code'],
            message: result['message'],
            responseObject: result['responseObject'],
            getResult: function () {
                return this.responseObject;
            },
            getMessage: function () {
                return this.message;
            },
            getResponseObject: function () {
                return this.responseObject;
            },
            getCode: function () {
                return this.code;
            }
        };
        if (callback !== null) {
            callback(rw);
        }
    }
};

export const getKeyInfo = (callBackFunc: any): any => {
    const getKeyInfo = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getKeyInfo",
        "args": ['PKCS12']
    };
    callback = callBackFunc;
    return webSocket.send(JSON.stringify(getKeyInfo));
};