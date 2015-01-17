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

Template._sirakshat_text.helpers({
	text: function () {
		return this.text || "Enter some text here";
	}
});

Template._sirakshat_heading.helpers({
	text: function () {
		return this.text || "Enter some text here";
	}
});

Template._sirakshat_text.events({
	'blur .st-text-block': function (e,tmpl) {
		if(!this.isEditable) return;
		var text = $(e.currentTarget).text();
		$(tmpl.find('.st-text-block')).html(text);
		this.update({
			text: text
		});
	}
});

Template._sirakshat_heading.events({
	'blur .st-text-block': function (e,tmpl) {
		if(!this.isEditable) return;
		var text = $(e.currentTarget).text();
		$(tmpl.find('.st-text-block')).html(text);
		this.update({
			text: text
		});
	}
});
