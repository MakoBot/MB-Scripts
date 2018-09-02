var cmd = require('node-cmd');
var fs = require('fs');
const got = require('got');
var scriptListingFile = 'ScriptListing.json';
const currentScriptListing = fs.readFileSync(scriptListingFile, 'utf8');
(async () => {
    try {
        const freshScriptListing = await got('https://us-central1-makobot-web.cloudfunctions.net/buildScriptListing',{json: true});
        
		
		
		console.log('freshScriptListing: ', freshScriptListing.body);
		console.log('currentScriptListing: ', currentScriptListing);
		if(freshScriptListing != currentScriptListing)
		{
			fs.writeFileSync(scriptListingFile, freshScriptListing);
			 cmd.run( 'git add . && git commit -m \"' + (new Date).getTime() + '\" && git push' );
		}
        //=> '<!doctype html> ...'
    } 
	catch (error) 
	{
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();

