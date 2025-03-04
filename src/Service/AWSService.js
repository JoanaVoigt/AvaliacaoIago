const AWSRepository = require('../Repository/AWSRepository');
const ImagemService = require('../Service/ImagemService');
const path = require('path');
const fs = require('fs');

class AWSService {
    async uploadFile(file, usuario_id) {
        try {
            const resultado = await AWSRepository.uploadFile(file);

             const referencia = resultado.url; 
             
             await ImagemService.criarNovaImagem(referencia, usuario_id);

            return resultado;
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem e salvar no banco de dados: " + error.message);
        }
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
