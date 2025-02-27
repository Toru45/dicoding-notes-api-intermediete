const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;
    if (!fs.existsSync(folder)) {
      // Options recursive: true membuat mkdirSync bekerja secara rekursif
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    // filename menampung nilai nama berkas yang dituliskan
    // Nilainya diambil dari meta.filename yang dikombinasikan dengan timestamp
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;
    const fileStream = fs.createWriteStream(path);

    // mengembalikan Promise sehingga proses penulisan berkas akan berjalan secara asynchronous.
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
