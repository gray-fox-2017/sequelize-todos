'use strict'
import Controller from './Controller.js'

let argv = process.argv
let start = new Controller(argv)
start.run()

