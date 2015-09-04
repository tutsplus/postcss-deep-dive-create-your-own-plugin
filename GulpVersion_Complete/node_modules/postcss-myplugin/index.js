var postcss = require('postcss');
var _ = require('underscore');

// Font stacks from http://www.cssfontstack.com/
var fontstacks_config = {
	'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
	'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
}

// Credit for this function to http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = postcss.plugin('myplugin', function (options) {

	return function (css) {

		options = options || {};

		// Extend the default fontstacks_config option with any custom fontstacks set in the plugin's options
		fontstacks_config = _.extend(fontstacks_config, options.fontstacks);

		css.walkRules(function (rule) {

			rule.walkDecls(function (decl, i) {

				var value = decl.value;

				if (value.indexOf( 'fontstack(' ) !== -1) {

					// Get the name of the fontstack requested by matching the string inside the brackets of fontstack(). 
					// Then replace any double or single quotes therein.
					var fontstack_requested = value.match(/\(([^)]+)\)/)[1].replace(/["']/g, "");

					// Title case the words in the font name, just in case the user didn't do it themselves
					fontstack_requested = toTitleCase(fontstack_requested);

					// Lookup the requested fontstack in the fontstack_config object
					var fontstack = fontstacks_config[fontstack_requested];

					// Find and store any font names that might be already be in the value, before the fontstack() call
					var first_font = value.substr(0, value.indexOf('fontstack('));

					// Create the new value for this rule by combining the first_font and fontstack variables
					var new_value = first_font + fontstack;

					// Send the new value back into the stylesheet
					decl.value = new_value;

				}

			});

		});

	}

});