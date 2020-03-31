
export  class Spese {
    id: number;
    user_id: number;
    nome_spesa: string;
    conto_da: number;
    conto_da_desc: string;
    conto_a: number;
    conto_a_desc: string;
    category: number;
    category_desc: string;
    data: string;
    note: string;
    importo: number;
    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.conto_da = 0;
        this.conto_da_desc = '';
        this.conto_a_desc = '';
        this.conto_a = 0;
        this.category = 0;
        this.category_desc = '';
        this.data = '';
        this.note = '';
        this.importo = 0;

    }
}
