SirAkshat.registerBlockType({
	type: 'map',
	template: function(data) {
		return '_sirakshat_map';
	}
});

Template._sirakshat_map.events({
	
});

Template._sirakshat_map.rendered = function () {
	var self = this;
	var mapstyle = SirAkshat.getOptionValue('mapstyle');

	var mapOptions = {
		center: new google.maps.LatLng(this.data.lat || -37.8136, this.data.lng || 144.9631),
		zoom: this.data.zoom || 13,
		styles: mapstyle,
		scrollwheel: false,
		streetViewControl: false
	};

	var map = new google.maps.Map(this.find('.map-canvas'), mapOptions);

	google.maps.event.addListener(map, 'zoom_changed', function() {
	    if(!self.data.isEditable) return;
	    zoomLevel = map.getZoom();
	    self.data.update({
			zoom: zoomLevel
		});
	});

	var iCircle;

	var icircleopts = {
		center: map.getCenter(),
		map: map,
		radius: this.data.radius || 5000,
		editable: this.data.isEditable,
		draggable: true,
		stroke_weight: 5,
		posChangeCallback: function(coords) {
			self.data.update({
				lat: coords.lat(),
				lng: coords.lng()
			});
		},
		radiusChangeCallback: function(newRadius) {
			self.data.update({
				radius: newRadius
			});
		},
		always_fit_to_map: false,
		resize_updown: '/resize_updown.png',
		resize_leftright: '/resize_leftright.png'
	}

	iCircle = new InvertedCircle(icircleopts);

};