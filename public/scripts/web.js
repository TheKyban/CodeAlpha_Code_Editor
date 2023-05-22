const html = document.getElementById("html")
const css = document.getElementById("css")
const js = document.getElementById("js")
const iframe = document.getElementById("frame")

const modes = {
    theme:"dracula",
    lineNumbers:true,
    lineWrapping: true,
    autoCloseBrackets:true,
}

const htmlEditor = CodeMirror.fromTextArea(html,{
    mode:"text/html",...modes
})
const cssEditor = CodeMirror.fromTextArea(css,{
    mode:"text/css",...modes
})
const jsEditor = CodeMirror.fromTextArea(js,{
    mode:"text/javascript",...modes
})

htmlEditor.setSize("100%","100%")
cssEditor.setSize("100%","100%")
jsEditor.setSize("100%","100%")

// console.log({})

const iframeData = () => {
    const html_v = htmlEditor.getValue()
    const css_v = cssEditor.getValue()
    const js_v = jsEditor.getValue()

    // console.log(html_v)
    iframe.contentDocument.body.innerHTML = `<style>${css_v}</style> ${html_v} <script>${js_v}</script>`
    iframe.contentWindow.eval(js_v)
}


htmlEditor.on('change',iframeData)
cssEditor.on('change',iframeData)
jsEditor.on('change',iframeData)
