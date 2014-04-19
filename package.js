Package.describe({
  summary: "Like Sir Trevor, but with 2 way reactive databinding"
});

Package.on_use(function (api) {
	api.use(['deps', 'underscore', 'templating', 'session'], 'client');
    
	var path = Npm.require('path');


	api.add_files('components/gmap.inverted.circle.js', 'client');


	api.add_files(path.join('components', 'center.png'), 'client');
	api.add_files(path.join('components', 'resize_leftright.png'), 'client');
	api.add_files(path.join('components', 'resize_updown.png'), 'client');



	api.add_files('lib/sir_ak.js', 'client');
	api.add_files('lib/component_top.html', 'client');
	api.add_files('lib/component_top.js', 'client');


	//Components
	api.add_files('components/video.html', 'client');
	api.add_files('components/video.js', 'client');
	api.add_files('components/image.html', 'client');
	api.add_files('components/image.js', 'client');
	api.add_files('components/text.html', 'client');
	api.add_files('components/text.js', 'client');
	api.add_files('components/map.html', 'client');
	api.add_files('components/map.js', 'client');


	api.add_files('sirakshat.css', 'client');
	api.add_files('icons/icons.css', 'client');

	api.export('SirAkshat', 'client');
});
