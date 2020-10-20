export class Token {
    public id? : number;
    public access_token? : string;
    public token_type? : string;
    public refresh_token? : string;
    public expires_in? : number;
    public scope? : string;
    public jti? : string;
    public additionalInformation? : string;
    public signingKey? : string;
    public verifierKey? : string;
}
