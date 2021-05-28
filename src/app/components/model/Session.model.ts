import { JwtUser } from "./JwtUser.model";


export class Session {
  public token: string;
  public user: JwtUser;

  constructor(tokenIn: string, userin: JwtUser) {
    this.token = tokenIn;
    this.user = userin;
  }

}