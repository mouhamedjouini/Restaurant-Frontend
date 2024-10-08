import { Role } from "./Role";

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    roles: Role[];
  
    constructor(
      id: number,
      username: string,
      password: string,
      email: string,
      enabled: boolean,
      roles: Role[]
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.enabled = enabled;
      this.roles = roles;
    }
  }
  