Music = {
	sharpNotes: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
	flatNotes: ["A", "Bb", "B", "C", "Db", "D", "Eb", "Fb", "F", "Gb", "G", "Ab"],
	numerals: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IIX", "IX", "X", "XI", "XII", "XIII"],

	modifierHtml: function(modifier) {
		if (modifier == 1)
			return "&#9839";
		if (modifier == -1)
			return "&#9837";
		if (modifier == -2)
			return "&#9837&#9837";
		if (modifier == 2)
            return "x"
		
		return "";
	},
	
	noteNameHtml: function(note) {
		return note.noteName + this.modifierHtml(note.modifier);	
	},

	intervalNameHtml: function(interval) {
		return this.numerals[interval.major] + this.modifierHtml(interval.modifier);	
	},
	
	vexFlowKey: function(note) {		
		var modifier = this.vexFlowModifier(note.modifier);
		
		return note.noteName.toLowerCase() + modifier + "/" + note.octave;
	},
	
	vexFlowModifier: function(modifier) {
		if (modifier == 0)
			return "";
		if (modifier == 1)
			return "#";
		if (modifier == 2)
			return "##";
		if (modifier == -1)
			return "b";
		if (modifier == -2)
			return "bb";
		return "";
	},

    vexFlowTabChord: function(chordFingering) {
        var positions = new Array();
        for (var string = 0; string<chordFingering.fingers.length; ++string) {
            var fret = chordFingering.capoRelativeFrets[string];
            if (fret != -1)
                positions.push({str: string+1, fret: fret});
        }
        return new Vex.Flow.TabNote({positions: positions, duration: "q"});
    },
	
	vexFlowChord: function(notes) {
		// Build the keys element for the notes
		var keys = new Array(notes.length);
		for (var i = 0; i<keys.length; ++i) {
			keys[i] = this.vexFlowKey(notes[i]);
		}
		var vexNote = new Vex.Flow.StaveNote({keys: keys, duration: "q"});
		
		// Add any accidental elements for the notes
		for (var i = 0; i<keys.length; ++i) {
			if (notes[i].modifier != 0) {
				var modifier = this.vexFlowModifier(notes[i].modifier);
				vexNote.addAccidental(i, new Vex.Flow.Accidental(modifier));
			}
		}
		
		return vexNote;
	},
	
	/**
	 * Creates a VexFlow note for the given note
	 */
	vexFlowNote: function(note, duration) {	
		var keys = [this.vexFlowKey(note)];
		var vexNote = new Vex.Flow.StaveNote({keys: keys, duration: (duration+"")});
	    
		if (note.modifier != 0) {
			var modifier = this.vexFlowModifier(note.modifier);
			vexNote.addAccidental(0, new Vex.Flow.Accidental(modifier));
		}
		
		return vexNote;
	},
	
	adjustNotesOctaves: function(notes, octaves) {
		var newNotes = new Array(notes.length);
		for (var i = 0; i<notes.length; ++i) {
			newNotes[i] = {
				noteName: notes[i].noteName,
				modifier: notes[i].modifier,
				octave: notes[i].octave + octaves,
			};
		}
		
		return newNotes;
	},
	
	calcDiagram: function(chordFingering) {
        var numStrings = chordFingering.notes.length;
		chordFingering.diagramFrets = new Array(numStrings);
		for (var s = 0; s<numStrings; ++s) {
			if (chordFingering.capoRelativeFrets[s] <= 0)
				chordFingering.diagramFrets[s] = chordFingering.capoRelativeFrets[s];
			else
				chordFingering.diagramFrets[s] = chordFingering.capoRelativeFrets[s] - chordFingering.position + 1;
		}
        console.log(chordFingering.diagramFrets);
	}
};