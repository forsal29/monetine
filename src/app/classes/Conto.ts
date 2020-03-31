
export  class Conto {
    id: number;
    user_id: number;
    nome_conto: string;
    saldo: number;
    preview: string;
    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.nome_conto = '';
        this.saldo = 0;
        this.preview = '0';

    }
}
