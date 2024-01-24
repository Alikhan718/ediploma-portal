import React from "react";

export function humanReadableToLocalTime(time: string, delimeter: string): string {
    const date = new Date(
        time.replace("Dated on ", "")
            .split(", minute ")[0]
    ).toLocaleDateString("en-GB");
    return date.replaceAll("/", delimeter);
}

export function extractYearFromHumanReadable(time: string, delimeter: string): string {
    const year = time.replace("Dated on ", "")
        .split(", minute ")[0];
    return year.split(", ")[1];
}

let webSocket: any = null;
export const enableWebSocket = (set: any = null) => {
    try {
        if (webSocket == null) {
            webSocket = new WebSocket('wss://127.0.0.1:13579/');
            webSocket!.onopen = (): void => {
                console.log("Connection opened");
                if (set){
                    set(true);
                }
            };

            webSocket!.onclose = (event: any): void => {
                if (event.wasClean) {
                    console.log('connection has been closed');
                } else {
                    console.log('Connection error');
                    if (set){
                        set(false);
                    }
                    alert("NCALayer не найден");
                }
                console.log('Code: ' + event.code + ' Reason: ' + event.reason);
            };


            webSocket!.onmessage = (event: any): void => {
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
        }
        // console.log("Websocket connected!");

    } catch (e: any) {
        console.log(e.getMessage());
    }
};

let callback: any = null;

export const signXml = (university_id: number, callBackFunc: any) => {
    try {
        let xmlToSign =
            `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <Signature>
                <SignedData>
                    <FilePath>
                        https://generator.ediploma.kz/get-file/jsons/${university_id}/fullMetadata.json
                    </FilePath>
                    <UniversityName>${university_id}</UniversityName>
                </SignedData>
            </Signature>`;
        const signXml = {
            "module": "kz.gov.pki.knca.commonUtils",
            "method": "signXml",
            "args": ['PKCS12', "SIGNATURE", xmlToSign, "", ""]
        };
        callback = callBackFunc;
        webSocket.send(JSON.stringify(signXml));
    } catch (e) {
        alert("NcaLayer не найден");
    }
};
export const createCAdESFromFile = (university_id: number, callBackFunc: any): any => {
    try {
        var createCAdESFromFile = {
            "module": "kz.gov.pki.knca.commonUtils",
            "method": "createCAdESFromFile",
            "args": ['PKCS12', "SIGNATURE", `https://generator.ediploma.kz/get-file/jsons/${university_id}/fullMetadata.json`, true]
        };
        callback = callBackFunc;
        return webSocket.send(JSON.stringify(createCAdESFromFile));
    } catch (e) {

        alert("NcaLayer не найден");
    }
};

export const getKeyInfo = (callBackFunc: any): any => {
    try {
        const getKeyInfo = {
            "module": "kz.gov.pki.knca.commonUtils",
            "method": "getKeyInfo",
            "args": ['PKCS12']
        };
        callback = callBackFunc;
        return webSocket.send(JSON.stringify(getKeyInfo));
    } catch (e) {
        alert("NcaLayer не найден");
    }
};