angular.module('conchordance')
.provider('midi', function() {
    this.$get = function() {
        return {
            duration: 5,
            velocity: 127,
            increment: 0.1,
            playNote: function(note, offset) {
                offset = typeof offset !== 'undefined' ? offset : 0;
                MIDI.noteOn(0, note.halfSteps, this.velocity, offset);
                MIDI.noteOff(0, note.halfSteps, this.velocity, offset + this.duration);
            },
            playNotes: function(notes) {
                var delay = 0;
                for (var index = notes.length - 1; index >= 0; index--) {
                    // Check for note
                    var noteGroup = notes[index];
                    if (noteGroup) {
                        // play the note
                        this.playNote(noteGroup.note, delay);
                        // Increment the delay
                        delay += this.increment;
                    }
                }
            }
        }
    };
})
.config(function(midiProvider) {
    MIDI.loader = {
        update: function(a, state, percent) {
            console.log(state);
        },
        message: function(msg) {
            console.log(msg);
        }
    };

    MIDI.loadPlugin({
        soundfontUrl: "/soundfont/",
        instrument: "acoustic_guitar_steel",
        instruments: ["acoustic_guitar_steel"],
        callback: function() {
            console.log("Loaded Midi");
            MIDI.programChange(0, 25);
            MIDI.setVolume(0, 127);
        }
    });
});