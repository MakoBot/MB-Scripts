var cmd = require('node-cmd');
var fs = require('fs');
const got = require('got');
const currentScriptListing = fs.readFileSync('ScriptListing.json', 'utf8');
(async () => {
    try {
        const freshScriptListing = await got('https://us-central1-makobot-web.cloudfunctions.net/buildScriptListing',{json: true});
        
		
		
		console.log('freshScriptListing: ', freshScriptListing.body);
		console.log('currentScriptListing: ', currentScriptListing);
		if(freshScriptListing != currentScriptListing)
		{
			 cmd.run( 'git add . && git commit -m \"testNODE\" && git push' );
		}
        //=> '<!doctype html> ...'
    } 
	catch (error) 
	{
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();

