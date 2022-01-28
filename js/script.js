let shell = `[c color="gold"]KrishenK Portfolio[/c] [version 10.0.19043.1466]
(c) KrishenK Corporation. All right reserved.

type "help", "copyright", "credits" or "license" for more information.\n`;

let command = document.getElementById('command');
let preCode = document.getElementById('pre-code');

/*
EVENTS
*/
window.addEventListener('load', () => {
    updateShell();
});

command.addEventListener('input', () => {
    if (command.innerHTML == '') command.innerHTML = '&lrm;';
});

command.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        execute(command.innerText.replace(/\u200E/g, ''));
        return false;
    }
});

/*
FUNCTIONS
*/

let decode = (text) => {
    let rows = text.split('\n'), decoded = '';
    let regex = [
        "(\[[[cC] color=(.*?)\])(.*?)(\[\/[cC]\])",

    ];
    let result = [
        '<span style="color:$1;">$2</span>',
    ];
    for (let row of rows) {
        if (group = row.matchAll(new RegExp(regex.join(''), 'gi'))) {
            [...group].forEach(match => {
                row = row.replace('[' + match[0], result[0].replace('$1', match[2].slice(1, -1)).replace('$2', match[3].slice(0, -2)));
            });
        }
        decoded += row + '\n';
    }
    //console.log(decoded);
    return decoded;
};

let execute = (commandStr) => {
    console.log(commandStr);
    shell += `\n[c color="#ffa500"]guest[/c]@[c color="#2672c9"]github[/c] [c color="#ffa500"]~[/c] $ ${commandStr}`;
    switch (commandStr) {
        case 'help':
            shell +=
                `\ncv : Show my CV.
products : Show my work\n`;
            break;
        case '':
            shell += '';
            break;
        default:
            shell += `\n${commandStr.split(' ')[0]}: command not found\n`;
            break;
    }
    clearCommand();
    updateShell();
}

let updateShell = () => {
    preCode.innerHTML = decode(shell);
}

let clearCommand = () => {
    command.innerHTML = '&lrm;';
}