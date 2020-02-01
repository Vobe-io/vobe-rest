function sendPOST(url, ajax) {
    $.ajax(Object.assign({
        url: window.location.origin + url,
        method: 'POST',
        data: {},
        error: alert
    }, ajax));
}