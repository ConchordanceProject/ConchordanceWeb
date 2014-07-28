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
		// TODO double sharp, etc
		
		return "";
	},
	
	noteNameHtml: function(note) {
		return note.noteName + this.modifierHtml(note.modifier);	
	},

	intervalNameHtml: function(interval) {
		return this.numerals[interval.major] + this.modifierHtml(interval.modifier);	
	},
	
	calcDiagram: function(chordFingering) {
		var lowestFret = 9001;
		var numFingers = 0;
		for (var s = 0; s<chordFingering.numStrings; ++s) {
			if (chordFingering.fingers[s] > 0) {
				++numFingers;
				if (chordFingering.absoluteFrets[s] < lowestFret)
					lowestFret = chordFingering.absoluteFrets[s];
			}
		}
		
		chordFingering.position = numFingers > 0 ? lowestFret : 0;
		chordFingering.diagramFrets = new Array(chordFingering.numStrings);
		for (var s = 0; s<chordFingering.numStrings; ++s) {
			if (chordFingering.capoRelativeFrets[s] <= 0)
				chordFingering.diagramFrets[s] = chordFingering.capoRelativeFrets[s];
			else
				chordFingering.diagramFrets[s] = chordFingering.capoRelativeFrets[s] - chordFingering.position + 1;
		}
	},
};