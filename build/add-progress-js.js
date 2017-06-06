function MyPlugin(options) {
	// Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
	// ...
	compiler.plugin('compilation', function(compilation) {
//		console.log('The compiler is starting a new compilation...');
		var paths=["111",'222','3333']
		compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
			//    htmlPluginData.html += 'The magic footer';
			//    callback(null, htmlPluginData);
//			console.log(htmlPluginData);
			for(var i = htmlPluginData.assets.js.length - 1; i >= 0; i--) {
				htmlPluginData.assets.js[i]=htmlPluginData.assets.js[i]+'"></script><script type="text/javascript">console.log("progress'+i+'")</script><script type="text/javascript';
			}
			for(var i = htmlPluginData.assets.css.length - 1; i >= 0; i--) {
				htmlPluginData.assets.css[i]=htmlPluginData.assets.css[i]+'" rel=stylesheet><script type="text/javascript">console.log("progress'+i+'")</script><link href="';
			}
			callback(null, htmlPluginData);
		});
		
		

		
	});

};

module.exports = MyPlugin;