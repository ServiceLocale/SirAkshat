Package.describe({
  summary: "Like Sir Trevor, but with 2 way reactive databinding"
});

Package.on_use(function (api) {


    api.export('SirAkshat');
	api.add_files('lib/sir_ak.js', 'client');

});