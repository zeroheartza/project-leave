import { getConnection } from "typeorm"
import { UserDto } from "../dto/user.dto"
import { tbUser } from "../entities/tbUser.entity"
import { tbUserProfile } from "../entities/tbUserProfile"
import * as bcrypt from 'bcrypt';
import { HttpStatus } from "@nestjs/common";
import { Response, Request, response } from 'express';

import { LoginDto } from "../dto/login.dto";




import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';


export class UserService {
    constructor() { }
    // @Cron('*/60 * * * * *')
    // runEvery10Seconds() {
    //     console.log('Every 60 seconds');
    // }

    async addUser(userDto:UserDto,res:any) {
        console.log(userDto)
        console.log(userDto.startingDate)
        const result1 = await getConnection().getRepository(tbUser).find({ where: { email: userDto.email } })
        const result2 = await getConnection().getRepository(tbUserProfile).find({ where: { staffId: userDto.staffId } })
        const result3 = await getConnection().getRepository(tbUserProfile).find({ where: { name: userDto.name } })
        const result4 = await getConnection().getRepository(tbUserProfile).find({ where: { phone: userDto.phone } })
        if (result1.length === 0  ) {
            if(result2.length === 0){
                if(result3.length !== 0){
                    
                    return res.status(HttpStatus.OK).json({ message: "Name with used" })
                }
                if(result4.length !== 0){
                    return res.status(HttpStatus.OK).json({ message: "Phone with used" })
                }
            let user = new tbUser()
            let userP = new tbUserProfile()
            userP.name = userDto.name
            user.email = userDto.email
            const hashedPassword = await bcrypt.hash(userDto.password, 12)
            user.password = hashedPassword
            userP.staffId = userDto.staffId
            userP.phone = userDto.phone
            userP.position = userDto.position
            userP.department = userDto.department
            userP.startingDate = userDto.startingDate

            user = await getConnection().getRepository(tbUser).save(user)
            userP.userId = user.userId
            userP = await getConnection().getRepository(tbUserProfile).save(userP)
            
            return res.status(HttpStatus.OK).json({ message: "Add User Success" })
            }
            else{
            return res.status(HttpStatus.OK).json({ message: "StaffID with used" })

            }
        }
        else {
            return res.status(HttpStatus.OK).json({ message: "Email with used" })
        }


    }

    async saveLog(userDto:UserDto,res:any) {
        console.log(userDto)
        console.log(userDto.startingDate)
        const result1 = await getConnection().getRepository(tbUser).find({ where: { email: userDto.email } })
        const result2 = await getConnection().getRepository(tbUserProfile).find({ where: { staffId: userDto.staffId } })
        const result3 = await getConnection().getRepository(tbUserProfile).find({ where: { name: userDto.name } })
        const result4 = await getConnection().getRepository(tbUserProfile).find({ where: { phone: userDto.phone } })
        if (result1.length === 0  ) {
            if(result2.length === 0){
                if(result3.length !== 0){
                    
                    return res.status(HttpStatus.OK).json({ message: "Name with used" })
                }
                if(result4.length !== 0){
                    return res.status(HttpStatus.OK).json({ message: "Phone with used" })
                }
            let user = new tbUser()
            let userP = new tbUserProfile()
            userP.name = userDto.name
            user.email = userDto.email
            const hashedPassword = await bcrypt.hash(userDto.password, 12)
            user.password = hashedPassword
            userP.staffId = userDto.staffId
            userP.phone = userDto.phone
            userP.position = userDto.position
            userP.department = userDto.department
            userP.startingDate = userDto.startingDate

            user = await getConnection().getRepository(tbUser).save(user)
            userP.userId = user.userId
            userP = await getConnection().getRepository(tbUserProfile).save(userP)
            
            return res.status(HttpStatus.OK).json({ message: "Add User Success" })
            }
            else{
            return res.status(HttpStatus.OK).json({ message: "StaffID with used" })

            }
        }
        else {
            return res.status(HttpStatus.OK).json({ message: "Email with used" })
        }


    }


    async create(admin: any) {
        console.log(admin)
        console.log(admin.startingDate)
        const result = await getConnection().getRepository(tbUser).find({ where: { email: admin.email } })
        if (result.length === 0) {
            let user = new tbUser()
            let userP = new tbUserProfile()
            
            user.email = admin.email
            const hashedPassword = await bcrypt.hash(admin.password, 12)
            user.password = hashedPassword
            userP.staffId = admin.staffId
            userP.name = admin.name
            userP.phone = admin.phone
            userP.position = admin.position
            userP.department = admin.department
            userP.startingDate = admin.startingDate
            user = await getConnection().getRepository(tbUser).save(user)
            userP.userId = user.userId
            userP = await getConnection().getRepository(tbUserProfile).save(userP)
            console.log('result', user,userP)
            return {user,userP}

        }
        else {
            console.log('result', 'Email is in use')
            
            return result
        }


    }

    async findidUser(id:string) {
        
        const user = await getConnection().getRepository(tbUser).find({ where: { userId: id } })
        const userP = await getConnection().getRepository(tbUserProfile).find({ where: { userId: id } })
        // console.log(result[0].password)
        // console.log(loginDto.password)
        return {user,userP}
      


    }
    
    async getUser(res: any) {
        
        
        const result = await getConnection().getRepository(tbUser).find()
        // console.log(result[0].password)
        console.log(result)
        return res.status(HttpStatus.OK).json({ message: result })
      


    }


    async findemailUser(loginDto:LoginDto,res:any) {
        
        
        const result = await getConnection().getRepository(tbUser).find({ where: { email: loginDto.email } })
        // console.log(result[0].password)
        // console.log(loginDto.password)
        if (result.length === 0) {
          
            return res.status(HttpStatus.OK).json({ message: "Fail" })
           

        }
        else {
            if (!await bcrypt.compare(loginDto.password, result[0].password)) {
                return res.status(HttpStatus.OK).json({ message: "Fail" })
            }
            else{
               
                return result[0]
            }
           
        }


    }

    async getLookUp(res: any) {

        const data =

        {
            "Position": ["UX Designer",
                "Web Designer",
                "Graphic Designer",
                "Product Innovation Associate",
                "Digital Marketing Associate",
                "Marketing Specilist (Content Writer)",
                "Social Innovation Associate",
                "Business Relationship Associate",
                "Business Investment Associate",
                "Business Secretary",
                "Finance & Invesment Associate",
                "Head of Developer",
                "Full Stack Developer",
                "Front End Developer",
                "Back End Developer",
                "HR Executive",
                "Accounting Executive",
                "Executive Admin Secretary"
            ],
            "Department": ["Business Team",
                "Developer Team",
                "Operation Team",
                "Marketing Team",
                "Innovation Team"
            ]
        }
        // const data =
        // {
        //     "position": [{"id":"1","value":"UX Designer"},{"id":"2","value":"UX Designer22"}]
              
        //     // ,
        //     // "department": [{"id":"1","value":"Business Team"},{"id":"2","value":"Business Team22"}]
        // }
        




        return res.status(HttpStatus.OK).json(data)
    }

    

    async checkroleUser(role:string,res: any) {
        var roleStaff = ["UX Designer",
        "Web Designer",
        "Graphic Designer",
        "Product Innovation Associate",
        "Digital Marketing Associate",
        "Marketing Specilist (Content Writer)",
        "Social Innovation Associate",
        "Business Relationship Associate",
        "Business Investment Associate",
        "Business Secretary",
        "Finance & Invesment Associate",
        "Full Stack Developer",
        "Front End Developer",
        "Back End Developer",
        "Accounting Executive",
        "Executive Admin Secretary"]

        var roleSuper = ["Head of Developer"]

        var roleHr = ["HR Executive"]
    
        var roleAdmin = ["Administrator"]
        if(roleStaff.includes(role)){
            const roleUser = "Staff"
            return res.status(HttpStatus.OK).json(roleUser )
        }
        if(roleSuper.includes(role)){
            const roleUser = "Super"
            return res.status(HttpStatus.OK).json(roleUser )
        }
        if(roleHr.includes(role)){
            const roleUser = "Hr"
            return res.status(HttpStatus.OK).json(roleUser )
        }
        if(roleAdmin.includes(role)){
            const roleUser = "Admin"
            return res.status(HttpStatus.OK).json(roleUser )
        }
       

    }

}