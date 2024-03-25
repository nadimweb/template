const fs = require('fs');
const zlib = require('zlib');

const zipFilePath = 'medcare.zip'; // Path to your zip file
const outputFolderPath = 'C:\Users\nadim\OneDrive\Desktop\template'; // Output folder where contents will be extracted

// Create a read stream for the zip file
const readStream = fs.createReadStream(zipFilePath);

// Create a zlib unzip stream
const unzipStream = zlib.createUnzip();

// Pipe the read stream into the unzip stream
readStream.pipe(unzipStream)
    .on('error', err => {
        console.error('Failed to extract zip file:', err);
    })
    .on('finish', () => {
        console.log('Zip file extracted successfully.');
    });

// Listen for 'data' event on the unzip stream
unzipStream.on('data', chunk => {
    // Write each chunk to the output folder
    fs.writeFileSync(outputFolderPath + '/' + chunk.name, chunk.data);
});
