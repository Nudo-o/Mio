class UINode {
    constructor(node) {
        this.node = typeof node === 'string' ? document.querySelector(node) : node
    }

    get classes() {
        return this.node.classLis
    }

    get text() {
        return this.node.innerText
    }

    set text(value) {
        this.node.innerText = String(value).toString()
    }

    get html() {
        return this.node.innerHTML
    }

    set html(value) {
        this.node.innerHTML = String(value).toString()
    }
    
    hasClass(className) {
        return this.classes.contains(className)
    }

    show() {
        if (this.hasClass("hidden")) return

        this.classes.remove("hidden")
    }

    hide() {
        if (!this.hasClass("hidden")) return

        this.classes.add("hidden")
    }
}

export default UINode