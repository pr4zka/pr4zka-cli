import { execSync } from "child_process";
import fs from "fs";
import progress from "progress";

const comando = process.argv[2];

if (comando === "mvc") {
  if (!fs.existsSync("./src")) {
    const progressBar = new progress(`${comando}: [:bar] :percent :etas`, {
      complete: "=",
      incomplete: "  ",
      width: 50,
      total: 7,
    });

    const createDirectories = async () => {
      const directories = [
        "./src",
        "./src/controllers",
        "./src/services",
        "./src/config",
        "./src/models",
        "./src/routes",
      ];

      for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        await fs.promises.mkdir(directory);
        progressBar.tick(); // Incrementa la barra de progreso

        if (i === directories.length - 1) {
          // Último directorio, escribir el archivo index.js
          await fs.promises.writeFile(
            `src/index.js`,
            `
        const express = require('express');
        const app = express();
        const port = 3000;

        app.get('/', (req, res) => {
          res.send('Hello World!');
        });

        app.listen(port, () => {
          console.log(\`Server is running on http://localhost:\${port}\`);
        });
        `,
            { encoding: "utf-8" }
          );
          progressBar.tick(); // Incrementa la barra de progreso
        }
      }
    };

    const copyConfigFiles = () => {
      // ... Aquí copia los archivos de configuración necesarios
    };

    const modifyPackageJson = () => {
      // Ruta del package.json
      const packageJsonPath = "./src/package.json";

      // Leer y parsear el contenido del package.json
      const packageJsonContent = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf-8")
      );

      // Agregar el script "dev" con el valor "nodemon index.js"
      packageJsonContent.scripts = {
        ...packageJsonContent.scripts,
        dev: "nodemon index.js",
      };

      // Escribir el contenido modificado de vuelta en el package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJsonContent, null, 2),
        "utf-8"
      );
    };

    const installDependencies = () => {
      // Crear el package.json en el directorio 'src'
      fs.writeFileSync("./src/package.json", "{}", { encoding: "utf-8" });

      // Modificar el package.json antes de instalar las dependencias
      modifyPackageJson();

      // Cambiar al directorio 'src' antes de instalar las dependencias
      process.chdir("./src");

      try {
        execSync("npm init -y");
        execSync("npm install express nodemon");
      } catch (error) {
        console.error("Error al instalar dependencias:", error);
      }
    };

    const initializeProject = async () => {
      await createDirectories();
      copyConfigFiles();
      installDependencies();
      console.log("Se ha creado la estructura MVC");
    };

    initializeProject();
  } else {
    console.log("La estructura MVC ya existe.");
  }
}
