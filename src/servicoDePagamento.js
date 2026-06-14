export default class servicoDePagamento {
  #pagamentos;

  constructor() {
    this.#pagamentos = [];
  }
  pagar(codigo, empresa, valor) {
    const categoria = valor > 100 ? 'cara' : 'padrão';

    this.#pagamentos.push({
      codigoBarras: codigo,
      empresa: empresa,
      valor: valor,
      categoria: categoria
    });
  }

  consultar() {
    if (this.#pagamentos.length === 0) {
      throw new Error("Nenhum pagamento realizado.");
    }
    return this.#pagamentos[this.#pagamentos.length - 1];
  }
}
