exports.outputFolder = "build";
exports.sourceFolder = "";

exports.buildConfiguration = "debug";

exports.scriptBundles = [
    {
        outputFile : "vendor.js",
        targetFolder: this.outputFolder + '/assets/js',
        files : [
            './bower_components/bootstrap/dist/js/bootstrap.js'
        ]
    },
    {
        outputFile : "app.js",
        targetFolder: this.outputFolder + '/assets/js',
        files : [
            './' + this.sourceFolder + '/assets/js/app.js'
        ]
    }
];

exports.styleBundles = [
    {
        outputFile : "base.css",
        targetFolder: this.outputFolder + '/assets/css',
        files : [
            './bower_components/github-fork-ribbon-css/gh-fork-ribbon.css',
			'./' + this.sourceFolder + '/assets/less/base.less'
        ]
    }
];

exports.assetBundles = [
    {
        targetFolder: this.outputFolder + '/assets/fonts',
        files : [
            './bower_components/font-awesome/fonts/fontawesome-webfont.*'
        ]
    },
	{
        targetFolder: this.outputFolder,
        files : [
            './**/*.hbs',
			'./package.json'
        ]
    },
	{
        targetFolder: this.outputFolder + '/assets/images',
        files : [
            './' + this.sourceFolder + '/assets/images/*'
        ]
    }
];