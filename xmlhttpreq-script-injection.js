const XHR_DONE = 4
const HTTP_SUCCESSFUL_STATUS_CODES = 200
const HTTP_REDIRECTION_STATUS_CODES = 300
const HTTP_NOT_MODIFIED_STATUS_CODE = 304

/**
 * XMlHttpRequest Script Injection
 * OBSERVATION: JavaScript file must be located on the same domain as the page requesting it
 * @param {*} url - the url of the script to be injected
 * @param     callback - function to be called after the script is injected
 */
function injectScript(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true) 
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XHR_DONE) {
            if (xhr.status >= HTTP_SUCCESSFUL_STATUS_CODES && xhr.status < HTTP_REDIRECTION_STATUS_CODES || xhr.status === HTTP_NOT_MODIFIED_STATUS_CODE) {
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.text = xhr.responseText

                // script execution can be defered here until a condition is met

                document.body.appendChild(script)

                if (callback) {
                    callback()
                }
            }
        }
    }

    xhr.send()
}

injectScript('file1.js', () => {
    alert("Script has been loaded for execution")
})