import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import { v4 as id } from 'uuid'


/**
 * check folder exist or not
 * if not then i have create
*/
const folder = "codes"
const content = `

`

/**
 * Main Function
 */
export function Main(lang, content) {
    try {
        let name = id()
        let type;
        switch (lang) {
            case "python":
                name += ".py"
                type = "python"
                break;
            case "java":
                name += ".java"
                type = "java"
                break;
            case "javaScript":
                name += ".js"
                type = "node"
                break;
            case "cpp":
                name += ".cpp"
                type = "g++"
                break
        }


        makeFile(name, content)
        const output = FileExecution(type, `${folder}/${name}`)
        return output
    } catch (error) {
        console.log(error)
    }
}

/**
 * Delete Folder
 */

export function flush() {
    if (fs.existsSync(folder)) {
        fs.rmSync("codes", { recursive: true })
    }
}

/**
 * Folder making
 */

function folderMake() {
    const name = folder
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name)
        return name
    }

    return name
}

/**
 * Making File
 */

function makeFile(name, content) {
    const folder = folderMake()
    const cwd = process.cwd()
    fs.writeFileSync(path.join(cwd, folder, name), content)
}


/**
 * File Execution
 */

function FileExecution(type, name) {
    const s = child_process.spawnSync(type, [name])
    return s.stdout.toString()
}

/**
 * Not Working
 */

const runCpp = () => {
    // const s = child_process.spawnSync("g++",["test.cpp -o codes"])
    const s = child_process.execSync(`g++ test.cpp -o codes`)
    // const out = child_process.execSync(`./codes .out`)
    const out = child_process.exec(`./codes .out`)
    out.stdout.on('data', (d) => {
        console.log(d)
    })

}

// runCpp()