#!/usr/bin/env node
const fs = require('fs');
const comando = process.argv[2];

if (comando === 'mvc') {
   if(!fs.existsSync('./src')){
        fs.mkdirSync('./src');
        fs.mkdirSync('./src/controllers');
        fs.mkdirSync('./src/services')
        fs.mkdirSync('./src/config');
        fs.mkdirSync('./src/models');
        fs.mkdirSync('./src/routes');

        fs.writeFileSync('./src/index.js', 'const express = require(\'express\')', { encoding: 'utf-8' });
   }
   console.log('Se ha creado la estructura MVC');
} else if (comando === 'dessing-patterns') {
       fs.mkdirSync('./src');
        fs.mkdirSync('./src/creational');
        fs.mkdirSync('./src/structural');
        fs.mkdirSync('./src/behavioral');
        fs.mkdirSync('./src/creational/factory');
        fs.mkdirSync('./src/creational/singleton');
} else {
  console.log('Comando no reconocido. Los comandos disponibles son: saludar, despedir');
}
