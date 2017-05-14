'use strict';

import Controller from './controller.js'
//write your code here
let argv = process.argv
let app = new Controller(argv)
app.start();
