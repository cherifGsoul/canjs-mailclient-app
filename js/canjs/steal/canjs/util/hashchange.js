/*!
 * CanJS - 2.0.4
 * http://canjs.us/
 * Copyright (c) 2013 Bitovi
 * Mon, 23 Dec 2013 19:49:14 GMT
 * Licensed MIT
 * Includes: CanJS default build
 * Download from: http://canjs.us/
 */
steal(function() {
	// This is a workaround for libraries that don't natively listen to the window hashchange event
	!function() {
		var addEvent = function (el, ev, fn) {
				if (el.addEventListener) {
					el.addEventListener(ev, fn, false);
				} else if (el.attachEvent) {
					el.attachEvent('on' + ev, fn);
				} else {
					el['on' + ev] = fn;
				}
			},
			onHashchange = function() {
				can.trigger(window, 'hashchange');
			};

		addEvent(window, 'hashchange', onHashchange);
	}();
});