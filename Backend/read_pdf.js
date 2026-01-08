import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');
const pdf = require('pdf-parse');

try {
    const dataBuffer = fs.readFileSync('../hikernet-4.pdf');
    pdf(dataBuffer).then(function (data) {
        console.log("PDF CONTENT START ----------------");
        console.log(data.text);
        console.log("PDF CONTENT END ------------------");
    }).catch(err => {
        console.error("Error parsing PDF:", err);
    });
} catch (err) {
    console.error("Error reading file:", err);
}
