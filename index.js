$(document).ready(function() {
    var Typer = {
        text: '',
        accessCountimer: null,
        index: 0,
        speed: 2,
        file: 'i42.txt',  // Ensure this points to the correct location
        accessCount: 0,
        deniedCount: 0,

        init: function() {
            $.get(this.file, function(data) {
                Typer.text = data.slice(0, Typer.text.length - 1);
                Typer.accessCountimer = setInterval(function() {
                    Typer.updLstChr();
                }, 500);
            }).fail(function() {
                console.error("Failed to load text from file.");
            });
        },

        content: function() {
            return $('#console').html();
        },

        write: function(str) {
            $('#console').append(str);
        },

        addText: function(key) {
            if (key.keyCode === 18 || key.keyCode === 20) {
                this[key.keyCode === 18 ? 'accessCount' : 'deniedCount']++;
                if (this[key.keyCode === 18 ? 'accessCount' : 'deniedCount'] >= 3) {
                    this[key.keyCode === 18 ? 'makeAccess' : 'makeDenied']();
                }
            } else if (key.keyCode === 27) {
                this.hidepop();
            } else if (this.text) {
                var cont = this.content();
                if (cont.endsWith('|')) {
                    $('#console').html(cont.slice(0, -1));
                }
                this.index += (key.keyCode !== 8) ? this.speed : (this.index > 0 ? -this.speed : 0);
                var newText = this.text.substring(0, this.index).replace(/\n/g, '<br/>');
                $('#console').html(newText);
                $('#console').scrollTop($('#console')[0].scrollHeight);
            }
        },

        updLstChr: function() {
            var content = this.content();
            $('#console').html(content.endsWith('|') ? content.slice(0, -1) : content + '|');
        },

        makeAccess: function() { /* Define functionality */ },
        makeDenied: function() { /* Define functionality */ },
        hidepop: function() { /* Define functionality */ }
    };

    Typer.init();

    $(document).on('keydown', functi
