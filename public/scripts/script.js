const id = document.getElementById("editor")

const run = document.querySelector('#run')
const input = document.querySelector("#Input")
let output = document.querySelector("#Output")



let editor = CodeMirror.fromTextArea(id, {
    mode: "text/x-c++src",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true
});

const width = window.innerWidth
editor.setSize(0.7 * width, "910")


/**
 * options of language
 */

let option = document.getElementById("autoSizingSelect")

option.addEventListener('change', (e) => {

    /**
     * Reseting values
     */

    editor.setValue("")
    output.value = ""
    input.value = ""

    if (option.value === "C++") {
        editor.setOption("mode", "text/x-c++src")
    }
    else if (option.value === "Python") {
        editor.setOption("mode", "text/x-python")
    }
    else if (option.value === "Java") {
        editor.setOption("mode", "text/x-java")
    }
})


/**
 * Run
 */


run.onclick = async () => {
    const url = document.URL + "compile"
    const code = {
        code: editor.getValue(),
        input: input.value,
        lang: option.value
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(code)
    }

    const res = await fetch(url, options)
    const data = await res.json()

    output.value = data.output

    // console.log(output,data.output)

}