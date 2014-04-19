SirAkshat.registerBlockType({
	type: 'text',
	template: function(data) {
		return '_sirakshat_text';
	}
});

SirAkshat.registerBlockType({
	type: 'heading',
	template: function(data) {
		return '_sirakshat_heading';
	}
});

Template._sirakshat_text.events({
	'blur .st-text-block': function (e) {
		if(!this.isEditable) return;
		this.update({
			text: e.currentTarget.innerHTML
		});
	}
});

Template._sirakshat_heading.events({
	'blur .st-text-block': function (e) {
		if(!this.isEditable) return;
		this.update({
			text: e.currentTarget.innerHTML
		});
	}
});