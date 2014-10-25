angular.module('conchordance', ['ui.router', 'ngAnimate'])
.factory('$music', function() {
	return Music;
})
.factory('$midi', function() {
	MIDI.loader =  {
		update: function(a, state, percent) {
			console.log(state);
		},
		message: function(msg) {
			console.log(msg);
		}
	}
	MIDI.loadPlugin({
		soundfontUrl: "/soundfont/",
		instrument: "acoustic_guitar_steel",
		instruments: ["acoustic_guitar_steel"],
		callback: function() {
			console.log("Loaded Midi");
			MIDI.programChange(0, 25);
		}
	});
	return MIDI;
})
.config(function($httpProvider) {
    // Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

