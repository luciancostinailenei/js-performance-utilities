/**
 * Dinamically loading for JavaScript files
 * @param {*} url - the url of the script to be dinamically loaded
 * @param {*} callback - the callback function to be executed after the script has been loaded
 */
function loadScript(url, callback) {
    let script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) { // IE
        script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') { 
                // because IE is inconsistent with which of these two states indicate the final state
                script.onreadystatechange = null // removing the event handler to be sure it is not handled twice
                callback()
            }
        }
    } else { // Other browsers
        script.onload = () => {
            callback()
        }
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)    
}

 // Dinamically loading scripts in chain example:
 loadScript('file1.js', () => {
     loadScript('file2.js', () => {
         loadScript('file3.js', () => {
             alert('All scripts are loaded')
         })
     })
 })