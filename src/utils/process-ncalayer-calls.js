function getActiveTokensCall() {
    blockScreen();
    getActiveTokens("getActiveTokensBack");
}

function getActiveTokensBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var listOfTokens = result['responseObject'];
        var storageSelect = document.getElementById('storageSelect');
        storageSelect.innerHTML = '<option value="PKCS12">PKCS12</option>';
        for (var i = 0; i < listOfTokens.length; i++) {
            var option = document.createElement('option');
            option.value = listOfTokens[i];
            option.text = listOfTokens[i];
            storageSelect.appendChild(option);
        }
    }
}


function getKeyInfoCall() {
    // blockScreen();
    getKeyInfo('PKCS12', "getKeyInfoBack");
}


function getKeyInfoBack(result) {
    // unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];

        let alias = res['alias'];
        document.getElementById("alias").value = alias;

        let keyId = res['keyId'];
        document.getElementById("keyId").value = keyId;

        let algorithm = res['algorithm'];
        document.getElementById("algorithm").value = algorithm;

        let subjectCn = res['subjectCn'];
        document.getElementById("subjectCn").value = subjectCn;

        let subjectDn = res['subjectDn'];
        document.getElementById("subjectDn").value = subjectDn;

        let issuerCn = res['issuerCn'];
        document.getElementById("issuerCn").value = issuerCn;

        let issuerDn = res['issuerDn'];
        document.getElementById("issuerDn").value = issuerDn;

        let serialNumber = res['serialNumber'];
        document.getElementById("serialNumber").value = serialNumber;

        let dateString = res['certNotAfter'];
        let date = new Date(Number(dateString));
        document.getElementById("notafter").value = date.toLocaleString();

        dateString = res['certNotBefore'];
        date = new Date(Number(dateString));
        document.getElementById("notbefore").value = date.toLocaleString();

        let authorityKeyIdentifier = res['authorityKeyIdentifier'];
        document.getElementById("authorityKeyIdentifier").value = authorityKeyIdentifier;

        let pem = res['pem'];
        document.getElementById("pem").value = pem;
    }
}

function signXmlCall() {
    let xmlToSign = $("#xmlToSign").val();
    let selectedStorage = $('#storageSelect').val();
    blockScreen();
    signXml(selectedStorage, "SIGNATURE", xmlToSign, "signXmlBack");
}

function signXmlBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#signedXml").val(res);
    }
}

function signXmlsCall() {
    let xmlToSign1 = $("#xmlToSign1").val();
    let xmlToSign2 = $("#xmlToSign2").val();
    let xmlsToSign = new Array(xmlToSign1, xmlToSign2);
    let selectedStorage = $('#storageSelect').val();
    blockScreen();
    signXmls(selectedStorage, "SIGNATURE", xmlsToSign, "signXmlsBack");
}

function signXmlsBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#signedXml1").val(res[0]);
        $("#signedXml2").val(res[1]);
    }
}

function createCAdESFromFileCall() {
    let selectedStorage = $('#storageSelect').val();
    let flag = $("#flag").is(':checked');
    let filePath = $("#filePath").val();
    if (filePath !== null && filePath !== "") {
        blockScreen();
        createCAdESFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCAdESFromFileBack");
    } else {
        alert("Не выбран файл для подписи!");
    }
}

function createCAdESFromFileBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMS").val(res);
    }
}

function createCAdESFromBase64Call() {
    let selectedStorage = $('#storageSelect').val();
    let flag = $("#flagForBase64").is(':checked');
    let base64ToSign = $("#base64ToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
        $.blockUI();
        createCAdESFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCAdESFromBase64Back");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCAdESFromBase64Back(result) {
    $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMSforBase64").val(res);
    }
}

function createCAdESFromBase64HashCall() {
    let selectedStorage = $('#storageSelect').val();
    let base64ToSign = $("#base64HashToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
        $.blockUI();
        createCAdESFromBase64Hash(selectedStorage, "SIGNATURE", base64ToSign, "createCAdESFromBase64HashBack");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCAdESFromBase64HashBack(result) {
    $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMSforBase64Hash").val(res);
    }
}

function applyCAdESTCall() {
    let selectedStorage = $('#storageSelect').val();
    let cmsForTS = $("#CMSForTS").val();
    if (cmsForTS !== null && cmsForTS !== "") {
        $.blockUI();
        applyCAdEST(selectedStorage, "SIGNATURE", cmsForTS, "applyCAdESTBack");
    } else {
        alert("Нет данных для подписи!");
    }
}

function applyCAdESTBack(result) {
    $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMSWithAppliedTS").val(res);
    }
}

function showFileChooserCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserBack");
}

function showFileChooserBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#filePath").val(res);
    }
}

function showFileChooserForTSCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserForTSBack");
}

function showFileChooserForTSBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#filePathWithTS").val(res);
    }
}

function changeLocaleCall() {
    let selectedLocale = $('#localeSelect').val();
    changeLocale(selectedLocale);
}

function createCMSSignatureFromFileCall() {
    let selectedStorage = $('#storageSelect').val();
    let flag = $("#flagForCMSWithTS").is(':checked');
    let filePath = $("#filePathWithTS").val();
    if (filePath !== null && filePath !== "") {
        blockScreen();
        createCMSSignatureFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCMSSignatureFromFileBack");
    } else {
        alert("Не выбран файл для подписи!");
    }
}

function createCMSSignatureFromFileBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMSWithTS").val(res);
    }
}

function createCMSSignatureFromBase64Call() {
    let selectedStorage = $('#storageSelect').val();
    let flag = $("#flagForBase64WithTS").is(':checked');
    let base64ToSign = $("#base64ToSignWithTS").val();
    if (base64ToSign !== null && base64ToSign !== "") {
        $.blockUI();
        createCMSSignatureFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCMSSignatureFromBase64Back");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCMSSignatureFromBase64Back(result) {
    $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        let res = result['responseObject'];
        $("#createdCMSforBase64WithTS").val(res);
    }
}