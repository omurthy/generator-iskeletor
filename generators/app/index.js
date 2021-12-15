"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red("generator-iskeletor")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "name",
        message: "After project created run these two commands npm install and bower install.And than you can run it with npm start .Are you ready ?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("_bower.json"),
      this.destinationPath("bower.json"),
      {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath("bowerrc"),
      this.destinationPath(".bowerrc")
    );

    // Server file
    this.fs.copyTpl(
      this.templatePath("_server.js"),
      this.destinationPath("server.js"),
      this.destinationPath("/views/index.ejs"),
      {
        name: this.props.name
      }
    );
    /// //Routes
    this.fs.copy(
      this.templatePath("_routes/_all.js"),
      this.destinationPath("routes/all.js")
    );

    // Model
    this.fs.copy(
      this.templatePath("_model/_todo.js"),
      this.destinationPath("model/todo.js")
    );

    // Views
    this.fs.copyTpl(
      this.templatePath("_views/_index.ejs"),
      this.destinationPath("views/index.ejs"),
      {
        name: this.props.name
      }
    );

    // Public/
    this.fs.copy(
      this.templatePath("_public/_css/_app.css"),
      this.destinationPath("public/css/app.css")
    );
    this.fs.copy(
      this.templatePath("_public/_js/_app.js"),
      this.destinationPath("public/js/app.js")
    );
    this.fs.copy(
      this.templatePath("_public/_libs/_delete.txt"),
      this.destinationPath("public/libs/delete.txt")
    ); 
  }

  // Install Dependencies
  install() {
    addDependencies({
      "body-parser": "^1.14.0",
      "cookie-parser": "^1.4.5",
      "ejs": "^2.3.4",
      "express": "^4.13.3",
      "mongoose": "^6.0.12"
    });
  }
};
