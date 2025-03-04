const AWSRepository = require('../Repository/AWSRepository');
const path = require('path');
const fs = require('fs');

class AWSService {
    async uploadFile(file) {
        return await AWSRepository.uploadFile(file);
    }

    async downloadFile(referencia) {
        const fileData = await AWSRepository.downloadFile(referencia);

        const downloadsPath = path.join(require('os').homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, referencia);

        fs.writeFileSync(filePath, fileData);

        return filePath;
    }
}

module.exports = new AWSService();