var hideEverything = function() {
	$('.st-block-controls__top').removeClass('with-st-controls');
	$('.st-block-controls').removeClass('st-block-controls--active');
}

Template.sirAkshat.helpers({
	plainEditData: function() {
		var self = this,
			index = -1;

		var onChange = this.onChange;
		var getData = function() {
			return self.data;
		}

		var updater = function(newBlockData) {
			var index = this.index;
			var data = self.data,
				blocks = (data && data.blocks) || [];
			
			_.extend(blocks[index], newBlockData);
			
			onChange({
				blocks: blocks
			});
		}


		return {
			isEditable : self.isEditable,
			index : index++,
			onChange : onChange,
			context : self.context,
			update : updater,
			getData : getData,
			index: -1
		}
	}
});

Template.sirAkshat.rendered = function () {
	$(window).bind('click', hideEverything);
};

Template.sirAkshat.destroyed = function () {
	$(window).unbind('click', hideEverything);
};

Template._sirakshat_displaymode.rendered = function () {
};

Template._sirakshat_editmode.rendered = function () {
};

Template._sirakshat_displaymode.events({
	'click .st-block-ui-btn--delete': function () {
		var data = this.getData(),
			blocks = data && data.blocks || [];
				
		if(confirm("Are you sure you want to delete this block")) {
			blocks.splice(this.index, 1);
			this.onChange({
				blocks: blocks
			});
		}
	}
});

Template._sirakshat_displaymode.helpers({
	blockType: function () {
		var blockTypes = SirAkshat.getBlockTypes();

		if(this.type in blockTypes) {
			var templ = blockTypes[this.type].template;
			if(typeof(templ) == 'string') return Template[blockTypes[this.type].template];
			else if(typeof(templ) == 'function') {
				var tmplName = templ(this);
				if(tmplName in Template) return Template[tmplName];
				throw new Error("Can't find " + tmplName);
			}
			else throw new Error("The template used in SirAkshat for '" + this.type + "' does not exist" );
		}else{
			console.log("BlockType not inited");
		}
	},
	isEditableCSS: function(z) {
		if(this.isEditable) return "sirakshat_editable_block";
	},
	blocks: function() {
		var self = this,
			index = 0;

		var onChange = this.onChange;
		var getData = function() {
			return self.data;
		}

		var updater = function(newBlockData) {
			var index = this.index;
			var data = self.data,
				blocks = (data && data.blocks) || [];
			
			_.extend(blocks[index], newBlockData);
			
			onChange({
				blocks: blocks
			});
		}

		var blocks = _((this.data && this.data.blocks) || []).map(function(block) {
			block.isEditable = self.isEditable;
			block.index = index++;
			block.onChange = onChange;
			block.context = self.context;
			block.update = updater;
			block.getData = getData;
			return block;
		});
		return blocks;
	}
});

Template._sirakshat_editmode.events({
	'click .st-block-controls__top': function (e, tmpl) {
		$(tmpl.find('.st-block-controls__top')).addClass('with-st-controls');
		$(tmpl.find('.st-block-controls')).addClass('st-block-controls--active');
		return false;
	},
	'click a.st-block-control': function(e,tmpl) {
		var type = e.currentTarget.getAttribute('data-type'),
			index = this.index,
			data = this.getData(),
			blocks = (data && data.blocks) || [];

		 
		//Initialize this template
		var blockTemplate = {
			type: type
		}

		blocks.splice(index + 1, 0, blockTemplate);

		$('.st-block-controls__top').removeClass('with-st-controls');
		$('.st-block-controls').removeClass('st-block-controls--active');

		this.onChange({
			blocks: blocks
		});

		return false;

	}
});