import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  constructor( private http:HttpClient) { }

  private url = 'http://localhost:9093/';
  

  register(user:User){
    return this.http.post(this.url+'register',user ,{responseType:'text'});

  }
  login(user:User){
    return this.http.post(this.login+'login',user ,{responseType:'text'});
  }

  AddRole(username:String , role:String):Observable<any>{
    const url = `${this.url}addRole/${username}/${role}`; 
    return this.http.post<any>(url, null, { observe: 'response' });
  }

  getall(){
    return this.http.get<User[]>(this.url+"all")
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
}  
getUserCurrent():Observable<any>{
  const tokenj=localStorage.getItem('jwt')
  if(tokenj!==null){
    this.token = tokenj;
    const decodedToken = this.helper.decodeToken(tokenj);
    console.log("token"+this.token)
    this.loggedUser = decodedToken.sub;
    return this.http.get(this.url+''+this.loggedUser)
  }
  return new Observable();
}
public isLoggedIn():boolean{
  let tokenj = localStorage.getItem('jwt')
  if(tokenj)
    return true
  else
  return false;
}

getToken(): String{
  return "";
}

getRoles():String[]{
  return this.roles;
}

decodeJWT() {
    if(this.token==undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles=decodedToken.roles;
    this.loggedUser=decodedToken.sub;
    console.log(""+this.roles+this.loggedUser);
  }
  private data$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getData(): Observable<any> { 
    return this.data$.asObservable();
   } 
    
    public setData(data: any): void { 
    this.data$.next(data);
       }
}