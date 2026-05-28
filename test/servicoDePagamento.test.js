import servicoDePagamento from "../src/servicoDePagamento.js";
import assert from 'node:assert';

describe('Testes do Serviço de Pagamento', function () {
    it('Validar que um pagamento com valor acima de 100 é classificado como caro', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('9876-1234-8523', 'Empresa de Biscoito', 158.60)
        const valorPago = servico.consultar();
        const pagamentoRealizado = valorPago.at(-1);

        //Assert
        assert.equal(pagamentoRealizado.codigoDeBarras, '9876-1234-8523');
        assert.equal(pagamentoRealizado.nomeDaEmpresa, 'Empresa de Biscoito');
        assert.equal(pagamentoRealizado.valorDoPagamento, 158.60);
        assert.equal(pagamentoRealizado.categoria, 'caro')

    });

    it('Validar que um pagamento com valor menor que 100 é classificado como padrão', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('8547-3695-8125', 'Empresa de Bolos', 98.54)
        const valorPago = servico.consultar();
        const pagamentoRealizado = valorPago.at(-1);

        //Assert
        assert.equal(pagamentoRealizado.codigoDeBarras, '8547-3695-8125')
        assert.equal(pagamentoRealizado.nomeDaEmpresa, 'Empresa de Bolos')
        assert.equal(pagamentoRealizado.valorDoPagamento, 98.54)
        assert.equal(pagamentoRealizado.categoria, 'padrão')

    });

    it('Validar que um pagamento com valor igual a 100 é classificado como padrão', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('2584-9631-7548', 'Empresa de Sucos', 100)
        const valorPago = servico.consultar();
        const pagamentoRealizado = valorPago.at(-1);

        //Assert
        assert.equal(pagamentoRealizado.codigoDeBarras, '2584-9631-7548')
        assert.equal(pagamentoRealizado.nomeDaEmpresa, 'Empresa de Sucos')
        assert.equal(pagamentoRealizado.valorDoPagamento, 100)
        assert.equal(pagamentoRealizado.categoria, 'padrão')

    });

    it('Validar que a consulta retorna apenas o último valor pago', function () {

        //Arrange
        const servico = new servicoDePagamento();

        //Act
        servico.pagar('2584-9631-7548', 'Empresa de Sucos', 100)
        servico.pagar('8547-3695-8125', 'Empresa de Bolos', 98.54)
        servico.pagar('9876-1234-8523', 'Empresa de Biscoito', 158.60)
        const valorPago = servico.consultar();
        const ultimoPagamento = valorPago.at(-1);

        //Assert
        assert.equal(ultimoPagamento.codigoDeBarras, '9876-1234-8523')
        assert.equal(ultimoPagamento.nomeDaEmpresa, 'Empresa de Biscoito')
        assert.equal(ultimoPagamento.valorDoPagamento, 158.60)

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