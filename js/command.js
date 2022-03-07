class Command {
    constructor(name, callback, description) {
        this.name = name;
        this.description = description;
        this.callback = callback;
    }

    set setDescription(description) {
        this.description = description;
    }

    get getDescription() {
        return this.description;
    }

    get getName() {
        return this.name;
    }
}