const AWS = require('aws-sdk');
const UUID = require('uuid');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA5RRHCKYZ3ZDRWAA6',
    secretAccessKey: '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'
});

const s3 = new AWS.S3();

class AWSRepository {

    async uploadFile(file) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: UUID.v4(),
                Body: file,
            };

            const resultado = await s3.upload(params).promise();
            return { url: resultado.Location };
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem no S3: " + error.message);
        }
    }

    async downloadFile(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const data = await s3.getObject(params).promise();
            return data.Body;
        } catch (error) {
            throw new Error("Erro ao baixar imagem do S3: " + error.message);
        }
    }
}

module.exports = new AWSRepository();