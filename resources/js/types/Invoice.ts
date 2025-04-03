export interface Invoice {
    // Primary keys and relations
    id: number;
    id_billing: number;
    id_customer: number;
    id_ipl: number;

    // Invoice numbers
    ipl_invoice: string;
    int_invoice: string;

    // IPL (Facility Management) related
    kuantitas_ipl: number;
    potongan_ipl: number;
    total_ipl: number;
    denda_ipl: number;
    ppn_ipl: number;
    ppn_iplnominal: number;
    diskonipl_persen: number;
    diskonipl_nominal: number;
    diskonipl_nominaltopersen: number;
    diskonipl_persentonominal: number;
    promo_ipl: number;
    promo_iplpersen: number;
    promo_iplnominal: number;
    start_ipl_invoice: Date;
    end_ipl_invoice: Date;
    bulanpromoipl_invoice: number;
    namapromoipl_invoice: string;

    // Internet related
    speed_internet: string;
    internet_invoice: number;
    kuantitas_internet: number;
    potongan_internet: number;
    total_internet: number;
    denda_internet: number;
    ppn_internet: number;
    ppn_internetnominal: number;
    diskoninternet_persen: number;
    diskoninternet_nominal: number;
    diskoninternet_nominaltopersen: number;
    diskoninternet_persentonominal: number;
    promo_internet: number;
    promo_internetpersen: number;
    promo_internetnominal: number;
    startinternet_invoice: Date;
    endinternet_invoice: Date;
    bulanpromointernet_invoice: number;
    namapromointernet_invoice: string;

    // General invoice fields
    potongan_tambahan: number;
    grandtotal_invoice: number;
    status_invoice: string;
    penalty_invoice: number;
    ppn_invoice: number;
    subtotal: number;
    send_date: Date;
    tgl_bayar: Date | null;
    tgl_jatuhtempo: Date;
    created_at: Date;
}