import { typeUser } from "src/core/enum";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

export class AdminService extends UserService {
    constructor() {
        super()
    }

    createAdmin( ) {
        const id = Math.floor(Math.random() * 10000) + 1;
        console.log(id)
       const json = `{  "name":"admin" ,
                        "email":"admin@admin.com",
                        "password":"admin1234",
                        "staffId":"${id}",
                        "phone":"",
                        "position" :"Administrator",
                        "department":"",
                        "startingDate":""
          }`;
        const admin =  JSON.parse(json);
        console.log(admin.startDate);
        return this.create(admin)
    }

    createUser(userDto:UserDto,res:any) {
      
        return this.addUser(userDto,res)
    }

    findEmail(loginDto:LoginDto,res:any){
        return this.findemailUser(loginDto,res)
    }
    
    findId(id:string){
        return this.findidUser(id)
    }

    getlookUp(res: any) {
        return this.getLookUp(res)
    }

    checkRoleUser(role:string,res: any) {
        return this.checkroleUser(role,res)
    }

    getuser(res: any) {
        return this.getUser(res)
    }
  



}