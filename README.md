#CB-JS-TOOLKIT

Only edit files inside **/src** except of **cbToolkit_BUNDLE.js**!

##Setup development tools

###If not done yet:
 - Install the **[node.js](http://nodejs.org)**
 - Install grunt
   <pre>
   $ npm install -g grunt-cli
   </pre>

###At least after the first pull:
 - 'cd' into the project dir and run
   <pre>
   npm install
   </pre>

##How to use development tools

While developing you can run **grunt watch** from inside your project dir.
This will trigger [jshint](http://www.jshint.com/) on every **src/\*\*/\*.js** file change.

When finished you have to run **grunt** from inside your project dir to compile the bundled and minified scripts.


For direct embed use script link and convert it to cdn with http://rawgit.com/
