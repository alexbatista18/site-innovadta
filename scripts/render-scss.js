"use strict";
const fs = require("fs");
const packageJSON = require("../package.json");
const upath = require("upath");
const postcss = require("postcss");
const sh = require("shelljs");

const stylesPath = upath.resolve(
    upath.dirname(__filename),
    "../src/css/styles.css"
);
const destPath = upath.resolve(
    upath.dirname(__filename),
    "../dist/css/style.css"
); // Destino para o CSS compilado

module.exports = function renderCSS() {
    const cssContent = fs.readFileSync(stylesPath, "utf8"); // Lê o conteúdo do arquivo CSS

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test("-e", destPathDirname)) {
        sh.mkdir("-p", destPathDirname); // Cria o diretório de destino, se necessário
    }

    postcss([require("autoprefixer")]) // Usa o Autoprefixer para adicionar prefixos aos navegadores
        .process(cssContent, { from: stylesPath, to: destPath })
        .then((result) => {
            result.warnings().forEach((warn) => {
                console.warn(warn.toString());
            });
            fs.writeFileSync(destPath, result.css.toString()); // Salva o CSS processado
        });
};
