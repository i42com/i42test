var Typer = {
    text: '',
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: 'i42.txt', // Ensure this path is correct
    accessCount: 0,
    deniedCount: 0,
    consoleElement: $('#console'), // Cache the jQuery object for performance

    init: function() {
        this.accessCountimer = setInterval(() => this.updLstChr(), 500);
        $.get(this.file, (data) => {
            this.text = data.slice(0, -1);
        });
    },

    content: function() {
        return this.consoleElement.html();
    },

    write: function(str) {
        this.consoleElement.append(str);
    },

    addText: function(key) {
        if (key.keyCode == 18 || key.keyCode == 20) {
            this[key.keyCode == 18 ? 'accessCount' : 'deniedCount']++;
            if (this[key.keyCode == 18 ? 'accessCount' : 'deniedCount'] >= 3) {
                this[key.keyCode == 18 ? 'makeAccess' : 'makeDenied']();
            }
        } else if (key.keyCode == 27) {
            this.hidepop();
        } else if (this.text) {
            var content = this.content();
            if (content.endsWith('|')) {
                this.consoleElement.html(content.slice(0, -1));
            }
            this.index += (key.keyCode != 8) ? this.speed : Math.max(0, this.index - this.speed);
            var newText = this.text.substring(0, this.index).replace(/\n/g, '<br/>');
            this.consoleElement.html(newText);
            this.scrollToBottom();
        }
    },

    scrollToBottom: function() {
        var scrollHeight = this.consoleElement.prop('scrollHeight');
        this.consoleElement.scrollTop(scrollHeight);
    },

    updLstChr: function() {
        var content = this.content();
        this.consoleElement.html(content.endsWith('|') ? content.slice(0, -1) : content + '|');
    },

    hidepop: function() {
        // Function logic to hide popup if necessary
    },

    makeAccess: function() {
        // Logic to handle access
    },

    makeDenied: function() {
        // Logic to handle denial
    }
};

Typer.init();

document.onkeydown = function(e) {
    if (e.keyCode == 27) { // Fast forward text
        Typer.index = Typer.text.length;
    }
    Typer.addText(e);
};
