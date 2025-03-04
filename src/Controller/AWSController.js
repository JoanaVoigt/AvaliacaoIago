const AWSService = require('../Service/AWSService');
const path = require('path');
const fs = require('fs');

class AWSController {

    async uploadFile(req, res) {
        try {
            const { file } = req.body;
            if (!file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            const resultado = await AWSService.uploadFile(file);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async downloadFile(req, res) {
        try {
            const { referencia } = req.params;
            if (!referencia) {
                return res.status(400).json({ error: "A referência da imagem é obrigatória." });
            }

            const filePath = await AWSService.downloadFile(referencia);

            res.download(filePath, (err) => {
                if (err) {
                    console.error("Erro ao enviar o arquivo:", err);
                    res.status(500).json({ error: "Erro ao enviar o arquivo." });
                }

                console.log(`Arquivo salvo em: ${filePath}`);
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();