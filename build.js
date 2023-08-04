import ejs from "ejs";
import fs from "fs";
import path from "path";

const viewsDir = path.join(process.cwd(), "views");
const distDir = path.join(process.cwd(), "dist");


function renderAndSave(templateName) {
    ejs.renderFile(path.join(viewsDir, templateName), { content: [] }, {}, function (err, str) {
      if (err) {
        console.error('Error rendering template', err);
      } else {
        const htmlFilePath = path.join(distDir, templateName.replace(/\.ejs$/, '.html'));
        fs.writeFileSync(htmlFilePath, str);
        console.log(`Rendered ${templateName} => ${htmlFilePath}`);
      }
    });
  }
  
  // Create 'dist' directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  
  // Get list of EJS templates and render each one
  fs.readdirSync(viewsDir).forEach((file) => {
    if (file.endsWith('.ejs')) {
      renderAndSave(file);
    }
  });