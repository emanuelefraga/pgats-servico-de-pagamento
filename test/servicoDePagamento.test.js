import servicoDePagamento from "../src/servicoDePagamento.js";
import assert from 'node:assert';

describe('Testes do Serviço de Pagamento', function () {
    it('Validar que um pagamento com valor acima de 100 é classificado como caro', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('9876-1234-8523', 'Empresa de Biscoito', 158.60)
        const pagamentoRealizado = servico.consultar();

        //Assert
        assert.equal(pagamentoRealizado.codigoBarras, '9876-1234-8523');
        assert.equal(pagamentoRealizado.empresa, 'Empresa de Biscoito');
        assert.equal(pagamentoRealizado.valor, 158.60);
        assert.equal(pagamentoRealizado.categoria, 'cara')

    });

    it('Validar que um pagamento com valor menor que 100 é classificado como padrão', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('8547-3695-8125', 'Empresa de Bolos', 98.54)
        const pagamentoRealizado = servico.consultar();

        //Assert
        assert.equal(pagamentoRealizado.codigoBarras, '8547-3695-8125')
        assert.equal(pagamentoRealizado.empresa, 'Empresa de Bolos')
        assert.equal(pagamentoRealizado.valor, 98.54)
        assert.equal(pagamentoRealizado.categoria, 'padrão')

    });

    it('Validar que um pagamento com valor igual a 100 é classificado como padrão', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('2584-9631-7548', 'Empresa de Sucos', 100)
        const pagamentoRealizado = servico.consultar();
    
        //Assert
        assert.equal(pagamentoRealizado.codigoBarras, '2584-9631-7548')
        assert.equal(pagamentoRealizado.empresa, 'Empresa de Sucos')
        assert.equal(pagamentoRealizado.valor, 100)
        assert.equal(pagamentoRealizado.categoria, 'padrão')

    });

    it('Validar que a consulta retorna apenas o último valor pago', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('2584-9631-7548', 'Empresa de Sucos', 100)
        servico.pagar('8547-3695-8125', 'Empresa de Bolos', 98.54)
        servico.pagar('9876-1234-8523', 'Empresa de Biscoito', 158.60)
        const ultimoPagamento = servico.consultar();
       
        //Assert
        assert.equal(ultimoPagamento.codigoBarras, '9876-1234-8523')
        assert.equal(ultimoPagamento.empresa, 'Empresa de Biscoito')
        assert.equal(ultimoPagamento.valor, 158.60)

    });

    it('Validar que um erro é retornado quando não há pagamento realizado', function () {

    //Arrange
    const servico = new servicoDePagamento();

    //Act & Assert
    assert.throws(
        function () { servico.consultar() },
        {
            message: 'Nenhum pagamento realizado.'
        }
    );

    });

})