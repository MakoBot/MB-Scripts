var cmd = require('node-cmd');
var fs = require('fs');
const got = require('got');
var scriptListingFile = 'ScriptListing.json';
const currentScriptListing = fs.readFileSync(scriptListingFile, 'utf8');
(async () => {
    try {
        const freshScriptListing = await got('https://us-central1-makobot-web.cloudfunctions.net/buildScriptListing',{json: true});
		var freshScriptListingString = JSON.stringify(freshScriptListing.body);
		console.log('freshScriptListing: ', freshScriptListingString);
		console.log('currentScriptListing: ', currentScriptListing);
		if(freshScriptListingString != currentScriptListing)
		{
			console.log('we need to update');
			fs.writeFileSync(scriptListingFile, freshScriptListingString);
			 cmd.run( 'git add . && git commit -m \"' + (new Date).getTime() + '\" && git push' );
		}
		else
			console.log('were up to date baby');
        //=> '<!doctype html> ...'
    } 
	catch (error) 
	{
        console.log(error);
        //=> 'Internal server error ...'
    }
})();

