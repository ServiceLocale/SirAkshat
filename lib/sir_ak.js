var blockDeps = new Deps.Dependency;
var blocks = {};
var imageUploaderHelper;
var options = {

}

SirAkshat = {
	registerBlockType: function(params) {
		blocks[params.type] = {
			template: params.template
		}
		blockDeps.changed();
	},
	getBlockTypes: function() {
		blockDeps.depend()
		return blocks;
	},
	registerImageUploader: function(callback) {
		imageUploaderHelper = callback;
	},
	uploadImageGetUrl:function(file, metadata, callback) {
		if(!imageUploaderHelper) throw new Error("You have not set a callback to upload images");

		imageUploaderHelper(file, metadata, callback);
	},
	registerOption: function(optionName, value) {
		options[optionName] = value;
	},
	getOptionValue: function(optionName, value) {
		return options[optionName];
	}
}