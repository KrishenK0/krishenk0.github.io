class Command {
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }

    get getName() {
        return this.name;
    }
}