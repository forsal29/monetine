
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
    importo: number;
    data: string;
    note: string;
    futura: string;
    ripetuta: string;
    rip_time:string;
    datafutura:string;
    
    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.nome_spesa = "";
        this.conto_da = 0;
        this.conto_da_desc = '';
        this.conto_a_desc = '';
        this.conto_a = 0;
        this.category = 0;
        this.category_desc = '';
        this.data = '';
        this.note = '';
        this.importo = 0;
        this.futura = '';
        this.ripetuta = '';
        this.rip_time = '';
        this.datafutura = '';

    }
    setData(spesa:Spese){
        this.id = spesa.id;
        this.user_id = spesa.user_id;
        this.nome_spesa = spesa.nome_spesa;
        this.conto_da = spesa.conto_da;
        this.conto_da_desc = spesa.conto_da_desc;
        this.conto_a_desc = spesa.conto_a_desc;
        this.conto_a = spesa.conto_a;
        this.category = spesa.category;
        this.category_desc = spesa.category_desc;
        this.data = spesa.data;
        this.note = spesa.note;
        this.importo = spesa.importo;
        this.futura = spesa.futura;
        this.ripetuta = spesa.ripetuta;
        this.rip_time = spesa.rip_time;
        this.datafutura = spesa.datafutura;
    }
}
