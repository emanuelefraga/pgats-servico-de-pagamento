export default class servicoDePagamento {
  #pagamentos;

  constructor() {
    this.#pagamentos = [];
  }
  pagar(codigo, empresa, valor) {
    const categoria = valor > 100 ? 'caro' : 'padrão';

    this.#pagamentos.push({
      codigoDeBarras: codigo,
      nomeDaEmpresa: empresa,
      valorDoPagamento: valor,
      categoria: categoria
    });
  }

  consultar() {
    if (this.#pagamentos.length === 0) {
      throw new Error("Nenhum pagamento realizado.");
    }
    return this.#pagamentos;
  }
}
