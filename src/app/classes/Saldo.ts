
export  class Saldo {
    id: number;
    nome_conto: string;
    entrate: number;
    uscite: number;
    totale: number;
    preview: boolean;
    constructor() {
        this.id = 0;
        this.nome_conto = '';
        this.entrate = 0;
        this.uscite = 0;
        this.totale = 0;
        this.preview = false;

    }
}
