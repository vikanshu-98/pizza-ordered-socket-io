let mix =require('laravel-mix')
mix.override((config) => {
    delete config.watchOptions;
});
mix.override((config) => {
    delete config.watchOptions;
});
mix.webpackConfig({
    stats: {
        children: true,
    },
});
mix.js('resources/js/app.js','public/js/app.js').sass('resources/scss/app.scss','public/css/app.css')