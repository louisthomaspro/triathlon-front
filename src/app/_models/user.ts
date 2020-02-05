export class User {
    token?: string;
    data : {
        id: string;
        roles: string[];
        email: string;
        seller_url: string;
    }
}