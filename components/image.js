SirAkshat.registerBlockType({
	type: 'image',
	template: function(data) {
		if(data.image_url == null) {
			if(!data.isEditable) return '_sirakshat_empty';
			return '_sirakshat_photo_edit';
		}else{
			return '_sirakshat_photo';
		}
	}
});

Template._sirakshat_photo_edit.rendered = function () {
	// this.data.update({
	// 	test: true
	// });
};

Template._sirakshat_photo_edit.events({
	'change input[type=file]': function (e, tmpl) {
		console.log(this);
		var self = this;
		var file = e.target.files[0];
		if(!file) {
			tmpl.find(".st-upload-btn").removeAttr("disabled").text("Select a file");
			console.log("No file selected");
			return;
		}

		tmpl.find(".st-upload-btn").attr("disabled", "disabled").text("Uploading...");

		SirAkshat.uploadImageGetUrl(file, {
			owner: Meteor.userId(),
			scope: this.context
		}, function(url) {
			tmpl.find(".st-upload-btn").removeAttr("disabled").text("Select a file");
			
			self.update({
			 	image_url: url
			});
		});
	}
});