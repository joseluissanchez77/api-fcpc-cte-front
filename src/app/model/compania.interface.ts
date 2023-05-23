export interface CompanyResponseI {
    current_page:   number;
    data:           Compnay[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Compnay {
    id:              number;
    nombre:          string;
    descripcion:     null;
    ruc:             string;
    razon_social:    string;
    razon_comercial: string;
    direccion:       string;
    emai:            string;
    procentaje_iva:  number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
