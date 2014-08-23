angular.module('conchordance').service('$conchordance', function($http) {
	var requestBase = "http://api.conchordance.com:8080/ConchordanceAPI/";
	this.getInstruments = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'instrument/GetInstruments',
		});
	};
	this.getFretboard = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'instrument/GetFretboard',
			params: {
				instrument: instrument,
				chordType: type,
				root: root,
			},
		});
	};
	this.getChordTypes = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'chord/GetChordTypes',
		});
	};
	this.getChords = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'chord/GetChords',
			params: {
				instrument: instrument,
				chordType: type,
				root: root,
			},
		});
	};
	this.getChord = function(root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'chord/GetChord',
			params: {
				chordType: type,
				root: root,
			},
		});
	};
});