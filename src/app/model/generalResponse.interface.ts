export interface GeneralResponseI {
    timestamps: Date;
    path:       string;
    detail:     Detail;
    code:       number;
}

export interface Detail {
    Bearer:   string;
    dataUser: DataUser;
}

export interface DataUser {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
}
