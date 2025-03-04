const ImagemRepository = require('../Repository/ImagemRepository');
const Imagem = require('../Entity/Imagem');

class ImagemService {
    async criarNovaImagem(referencia, usuario_id) {
        const novaImagem = new Imagem(referencia, usuario_id); 
        return await ImagemRepository.criarImagem(novaImagem);
    }

    async listarImagem() {
        return await ImagemRepository.listarImagem();
    }

    async buscarImagem(id) {
        return await ImagemRepository.buscarImagem(id);
    }

    async atualizarImagem(id, referencia) {
        const dadosAtualizados = { referencia };  
        return await ImagemRepository.atualizarImagem(id, dadosAtualizados);
    }
}

module.exports = new ImagemService();
