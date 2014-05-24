var providers = {
	vimeo: /(?:http[s]?:\/\/)?(?:www.)?vimeo.com\/(.+)/,
	youtube: /(?:http[s]?:\/\/)?(?:www.)?(?:(?:youtube.com\/watch\?(?:.*)(?:v=))|(?:youtu.be\/))([^&].+)/
}

SirAkshat.registerBlockType({
	type: 'video',
	template: function(data) {
		if(data.provider == null || data.remote_id == null) {
			if(!data.isEditable) return 'video_empty';
			return '_sirakshat_video_edit';
		}else{
			return '_sirakshat_video';
		}
	}
});

Template._sirakshat_video.helpers({
	provider: function () {
		switch(this.provider) {
			case "youtube":
				return Template['_sirakshat_videoblock_youtube_display'];
			case "vimeo":
				return Template['_sirakshat_videoblock_vimeo_display'];
		}
	}
});

Template._sirakshat_video_edit.events({
	'change input[name=video_url]': function (e) {
		var url = e.currentTarget.value,
			self = this;

		for(var provider in providers) {
			var match = url.match(providers[provider]);
			if(match) {
				self.update({
					provider: provider,
					remote_id: match[1]
				});
				return;
			}
		}

		alert("We couldn't find the video you provided");
	}
});