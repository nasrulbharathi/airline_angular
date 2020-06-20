export class User {
    constructor(
      public email: string,
      public id: string,
      public role: Role,
      // tslint:disable-next-line: variable-name
      private _token: string,
      // tslint:disable-next-line: variable-name
      private _tokenExpirationDate: Date
    ) {}

    public get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}

export enum Role {
  ADMIN_USER = 'admin',
  AIRLINE_USER = 'airlineuser'
}
