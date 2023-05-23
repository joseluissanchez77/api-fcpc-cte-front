export interface CustomerResponseI {
    current_page:   number;
    data:           Customer[];
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

export interface Customer {
    id:                  number;
    primer_nombre:       string;
    segundo_nombre:      string;
    primer_apellido:     string;
    segundo_apellido:    string;
    tipo_identificacion: string;
    identificacion:      string;
    direccion:           string;
    correo:              string;
    telefono:            string;
    fecha_nacimiento:    Date;
    edad:                number;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}
