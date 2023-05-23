export interface ProductResponseI {
    current_page:   number;
    data:           Product[];
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

export interface Product {
    id:          number;
    nombre:      string;
    descripcion: string;
    categoria:   string;
    codigo:      string;
    stock:       number;
    precio:      string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
