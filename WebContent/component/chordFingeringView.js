angular.module('conchordance')
.directive('chordFingeringView', function() {
	return {
        restrict: 'E',
        scope: {
            chord: '=fingering',
        },
        link: function(scope, element, attrs) {
        	element.addClass('chord-sample');
        	scope.width = 120;
        	scope.height = 150;
        	scope.showFingers = false;
        	scope.canvas = Raphael(element[0], 0, 0, scope.width, scope.height);
        	scope.canvas.setSize(scope.width, scope.height); // Somehow, the size doesn't take and this is necessary

        	scope.bgColor = "#fff";

        	scope.mouseover = function() {};
        	scope.mouseout = function() {};
        	scope.click = function() {};

        	scope.drawClef = false;

        	scope.renderDiagram = function() {
        		scope.canvas.clear();

        		var numFrets = 5;
        		var numStrings = scope.chord == null ? 6 : scope.chord.numStrings;

        		var chordWidth = Math.min(80, scope.width-20);
            	var chordHeight = Math.min(100, scope.height-10);

        		// Background rect
        		scope.canvas.rect(0, 0, scope.width, scope.height).attr({fill: scope.bgColor, stroke: "none"});
            	
            	var fretSpacing = chordHeight/numFrets;
            	var stringSpacing = chordWidth/(numStrings-1);

            	var chordLeft = (scope.width - chordWidth)/2;
            	var chordRight = chordLeft + chordWidth;
            	var chordTop = (scope.height - chordHeight)/2;
            	var chordBottom = chordTop + chordHeight;
            	
            	// chord border
                scope.canvas.rect(chordLeft, chordTop, chordWidth, chordHeight, 0).attr({fill: "#fff", stroke: "#000"});
                
                // position
                if (scope.chord.position > 0)
                	scope.canvas.text(chordLeft-12, chordTop+10, scope.chord.position).attr("font-size", 10);
                
             	// frets
                for (var f=1; f<numFrets; ++f) {
                	var fretY = chordTop+f*fretSpacing;
                	scope.canvas.path("M"+chordLeft+","+fretY+"H"+chordRight);
                }
             	// strings
                for (var s=1; s<numStrings-1; ++s) {
                	var stringX = chordLeft+s*stringSpacing;
                	scope.canvas.path("M"+stringX+","+chordTop+"V"+chordBottom);
                }
             	
                // fretdots
                if (scope.chord != null) {
        	     	for (var s = 0; s<scope.chord.numStrings; ++s) {
        	     		var fret = scope.chord.diagramFrets[s];
        	     		var x = chordLeft+(scope.chord.numStrings-s-1)*stringSpacing;
        	     		var y = chordTop+fret*fretSpacing-fretSpacing/2;
        	     		if (fret > -1) {
        	     			var c = scope.canvas.circle(x, y, fretSpacing/4)
        	         			.attr("stroke", "#000")
        	         			.attr("fill", "#fff");
        	     			if (fret > 0) {
        	     				c.attr("fill", "#888");
        	     				if (scope.showFingers)
        	     					scope.canvas.text(x, y, scope.chord.fingers[s])
        	     						.attr("fill", "#fff");
        	     			}
        	     		}
        	     	}
                }
             	
             	// Mouse hit area, top layer and transparent
                var hitbox = scope.canvas.rect(0, 0, scope.width, scope.height, 0)
        			.attr("fill", "#fff")
        			.attr("stroke", "none")
        			.attr("fill-opacity", "0");
                hitbox.hover(scope.mouseover, scope.mouseout);
                hitbox.click(scope.click);
        	};

        	scope.renderTab = function() {
        		scope.canvas.clear();

        		// Background rect
        		scope.canvas.rect(0, 0, scope.width, scope.height).attr({fill: scope.bgColor, stroke: "none"});

        		var numStrings = scope.chord == null ? 6 : scope.chord.numStrings;
        		var tabHeight = Math.min(60, scope.height-10);
        		var topLine = (scope.height - tabHeight) / 2;
        		var stringSpacing = tabHeight / (numStrings-1);
        		var centerX = scope.width/2;

        		var textWidth = 12;

        		// strings
        		for (var s=0; s<numStrings; ++s) {
        			// string
                	var stringY = topLine+s*stringSpacing;
                	scope.canvas.path("M0,"+stringY + "H"+scope.width);
        		}

        		// double-barline
        		scope.canvas.path("M"+(scope.width-1)+","+topLine + "V"+(topLine+tabHeight));
        		scope.canvas.path("M"+(scope.width-5)+","+topLine + "V"+(topLine+tabHeight));

        		// "TAB"
        		if (scope.drawClef) {
        			var sizeAttr = (tabHeight/3)+"px";
        			scope.canvas.text(10, topLine+tabHeight/6, "T").attr("font-size", sizeAttr);
        			scope.canvas.text(10, topLine+tabHeight/2, "A").attr("font-size", sizeAttr);
        			scope.canvas.text(10, topLine+5*tabHeight/6, "B").attr("font-size", sizeAttr);
        		}

                if (scope.chord != null) {
                	// frets
            		for (var s=0; s<numStrings; ++s) {
                    	var stringY = topLine+s*stringSpacing;
                		if (scope.chord.absoluteFrets[s] >= 0) {
                			scope.canvas.rect(centerX-textWidth/2, stringY-stringSpacing/2, textWidth, stringSpacing)
                				.attr("fill", scope.bgColor)
                				.attr("stroke", "none");
                			scope.canvas.text(centerX, stringY, scope.chord.absoluteFrets[s]);
                		}
                	}
        		}

        		// Mouse hit area, top layer and transparent
                var hitbox = scope.canvas.rect(0, 0, scope.width, scope.height, 0)
        			.attr("fill", "#fff")
        			.attr("stroke", "none")
        			.attr("fill-opacity", "0");
                hitbox.hover(scope.mouseover, scope.mouseout);
                hitbox.click(scope.click);
        	};

        	scope.renderNotes = function() {
        		scope.canvas.clear();

        		// Background rect
        		scope.canvas.rect(0, 0, scope.width, scope.height).attr({fill: scope.bgColor, stroke: "none"});

        		var staffHeight = 40;
        		var staffTop = (scope.height-staffHeight)/2;
        		var staffSpacing = staffHeight / 4;

        		//draw staff lines
        		for (var s = 0; s<5; ++s) {
        			var staffY = staffTop+s*staffSpacing;
                	scope.canvas.path("M0,"+staffY + "H"+scope.width);
        		}

        		// double-barline
        		scope.canvas.path("M"+(scope.width-1)+","+staffTop + "V"+(staffTop+staffHeight));
        		scope.canvas.path("M"+(scope.width-5)+","+staffTop + "V"+(staffTop+staffHeight));

        		// Treble clef
        		if (scope.drawClef) {
        			scope.canvas.text(20, staffTop+staffHeight, "&")
        				.attr("font-family", "MusicalSymbols")
        				.attr("font-size", staffHeight+"px");
        		}

        		var centerX = scope.width/2;
        		var ledgerLineWidth = staffSpacing+staffSpacing/2;
        		var octaveStaff = 7;
        		var prevPos = 100000;
        		var noteWidth = staffSpacing;
        		var accidentalX = centerX - noteWidth;

        		// Draw notes
        		if (scope.chord != null) {
        			for (var i = 0; i<scope.chord.notes.length; ++i) {
        				var n = scope.chord.notes[i].note;
        				var staffPos = 5 - n.note - (n.octave-5)*octaveStaff;
        				var x = centerX + (prevPos - staffPos <= 1 ? noteWidth : 0);
        				var y = staffTop+staffPos*staffSpacing/2;

        				prevPos = staffPos;

        				scope.canvas.ellipse(x, y, noteWidth/2, staffSpacing/2-1)
        					.attr("fill", "#000")
        					.attr("stroke", "none");

        				// accidentals
        				if (n.modifier == 1)
        					scope.canvas.text(accidentalX, y-staffSpacing/2, "#")
        						.attr("font-family", "Accidentals")
        						.attr("font-size", (staffSpacing*2)+"px");
        				if (n.modifier == 2)
        					scope.canvas.text(accidentalX, y-staffSpacing/2, "x")
        					.attr("font-family", "Accidentals")
        					.attr("font-size", (staffSpacing*2)+"px");
        				if (n.modifier == -1)
        					scope.canvas.text(accidentalX, y-staffSpacing/2, "b")
        					.attr("font-family", "Accidentals")
        					.attr("font-size", (staffSpacing*2)+"px");
        				if (n.modifier == -2)
        					scope.canvas.text(accidentalX, y-staffSpacing/2, "B")
        					.attr("font-family", "Accidentals")
        					.attr("font-size", (staffSpacing*2)+"px");

        				// upper ledger lines
        				for (var p = -2; p >= staffPos; p-=2) {
        					var lineY = staffTop+p*staffSpacing/2;
        		        	scope.canvas.path("M" + (centerX-ledgerLineWidth/2)
        		        			+","+lineY + "H"+(centerX + ledgerLineWidth/2));
        				}

        				// lower ledger lines
        				for (var p = 10; p <= staffPos; p+=2) {
        					var lineY = staffTop+p*staffSpacing/2;
        		        	scope.canvas.path("M" + (centerX-ledgerLineWidth/2)
        		        			+","+lineY + "H"+(centerX + ledgerLineWidth/2));
        				}
        			}
        		}

        		// Mouse hit area, top layer and transparent
                var hitbox = scope.canvas.rect(0, 0, scope.width, scope.height, 0)
        			.attr("fill", "#fff")
        			.attr("stroke", "none")
        			.attr("fill-opacity", "0");
                hitbox.hover(scope.mouseover, scope.mouseout);
                hitbox.click(scope.click);
        	};

        	scope.render = scope.renderDiagram;
        	
        	scope.render();
        }
    };
});
