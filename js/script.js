let shell = `[c color="orange"]KrishenK Portfolio[/c] [version 10.0.19043.1466]
(c) KrishenK 2022. All right reserved.

type "help", "copyright", "credits" or "license" for more information.\n`;

let command = document.getElementById('command');
let preCode = document.getElementById('pre-code');
let code = document.getElementById('code');
let more = document.getElementById('more');
let moreList = document.getElementById('more-list-container');
let moreClose = document.getElementById('more-footer');
let moreOpen = document.getElementById('more-open');
let darkmode = document.getElementById('darkmode-switch');
let colorsSwitch = document.getElementById('colors-switch');

let colors = [
    'blue',
    'indigo',
    'purple',
    'pink',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'white',
    'gray',
    'gray-dark',
]


let commands = [];

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
                row = row.replace('[' + match[0], result[0].replaceAll('$1', (colors.includes(match[2].slice(1, -1))) ? `var(--${match[2].slice(1, -1)}, ${match[2].slice(1, -1)})` : match[2].slice(1, -1)).replace('$2', match[3].slice(0, -2)));
            });
        }
        decoded += row + '\n';
    }
    return decoded;
};

let execute = async (commandStr) => {
    // console.log(commandStr);
    isFound = false;
    shell += `\n[c color="#ffa500"]guest[/c]@[c color="#2672c9"]github[/c] [c color="#ffa500"]~[/c] $ ${commandStr}`;

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];

        // console.log(command, command.name);
        if (command.name == commandStr) {
            command.callback();
            isFound = true;
            clearCommand();
            updateShell();
            return;
        }
    }
    if (!isFound && commandStr != '') shell += `\n${commandStr.split(' ')[0]}: command not found\n`;
    clearCommand();
    updateShell();
}

let initCommand = () => {
    commands.push(new Command("help", help, "Show every commands available"));
    commands.push(new Command("credits", () => printShell('author : KrishenK\nType "projects" or "products" to see all my projects and realizations.\n'), "Show the credits"));
    commands.push(new Command("license", () => printShell('(c) KrishenK 2022. All right reserved.\n'), "Show the license used"));
    commands.push(new Command("cls", clearShell, "Clear the terminal"));
}

let printShell = (text) => { shell += `\n${text}`; }

let updateShell = () => { preCode.innerHTML = decode(shell); }

let clearCommand = () => { command.innerHTML = '&lrm;'; }

let clearShell = () => { preCode.innerHTML = shell = ''; }

let help = () => {
    commands.forEach(command => {
        printShell(`${command.name}\t: ${command.description}`);
    });
    printShell('');
}

let upChk = (element) => {
    if (!element.checked) element.parentNode.classList.remove('on');
    else element.parentNode.classList.add('on');
}

let upDarkmode = () => {
    document.documentElement.setAttribute('data-theme', (darkmode.checked) ? 'dark' : 'light');
}

let upColors = () => {
    preCode.setAttribute('data-colors', colorsSwitch.checked);
}


/*
EVENTS
*/
window.addEventListener('load', () => {
    updateShell();
    initCommand();
});

window.addEventListener('keydown', () => command.focus() )

darkmode.addEventListener('change', upDarkmode);
colorsSwitch.addEventListener('change', upColors);

more.addEventListener('click', (e) => {
    if (e.target == more || e.path.indexOf(moreClose) >= 0 || e.path.indexOf(moreOpen) >= 0) {
        if (!more.classList.contains('open')) {
            moreOpen.style.opacity = 0;
        } else {
            moreList.className = 'hidden';
        }
    }
});

more.addEventListener('animationend', () => {
    if (more.classList.contains('open')) {
        moreList.className = 'visible';
    } else {
        moreOpen.style.position = 'initial';
        moreOpen.style.opacity = 1;
    }
});

moreOpen.addEventListener('transitionend', () => {
    if (moreOpen.style.opacity == 0) {
        moreList.style.display = 'flex';
        more.classList.add('open');
        more.classList.remove('close');
        moreOpen.style.position = 'absolute';
    }
});

moreList.addEventListener('transitionend', () => {
    if (moreList.className == 'hidden' && more.classList.contains('open')) {
        more.classList.remove('open');
        more.classList.add('close');
    }
});

preCode.addEventListener('DOMSubtreeModified', () => {
    if (preCode.parentNode.offsetHeight > code.offsetHeight) {
        code.scrollTo(0, preCode.scrollHeight);
    }
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

[...document.querySelectorAll('input[type="checkbox"]')].forEach(input => {
    input.addEventListener('input', upChk(input));
});

[...document.querySelectorAll('.switch')].forEach(el => {
    el.addEventListener('click', () => {
        // console.log(el.querySelector('input').checked);
        el.querySelector('input').click();

        upChk(el.querySelector('input'));
    });
    upDarkmode();
    upColors();
});