import { BadRequestException, Body, Controller, Delete, Get, Param, Post, ValidationPipe, Put, Res, HttpStatus, Injectable, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { ValidationError } from "class-validator";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { TokenDto } from "../dto/token.dto";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../service/admin.service";
import { Response, Request, response } from 'express';

@Injectable()
@ApiTags('Administrator')
@Controller('admin')
export class adminController {
   constructor(

      private readonly adminService: AdminService,
      private readonly jwtService: JwtService


   ) { }


   @Post('login')
   async login(
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) loginDto: LoginDto, @Res({ passthrough: true }) response: Response
   ) {

      const result = await this.adminService.findEmail(loginDto, response);
      console.log(result.userId)
      const jwt = await this.jwtService.signAsync({ id: result.userId });

    
      return response.status(HttpStatus.OK).json({ message: "Success",token:jwt})
    

   }

   @Post('user')
   async user(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) response: Response) {
      try {
        
         const token = tokenDto.token
         console.log(token)
         const data = await this.jwtService.verifyAsync(token);
         console.log(data)
        

         const user = await this.adminService.findId(data['id']);

         console.log(user)

         return user;
      } catch (e) {
         return {
            message: `Can't find token`
         }

      }
   }



   @Post('logout')
   async logout(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) response: Response) {
      const token = tokenDto.token
     
      return {
         message: 'logout success'
      }
   }






   @Post('createAdmin')
   @ApiOkResponse()
   async createAdmin(
   ) {

      return this.adminService.createAdmin();
   }

   @Get('lookUp')
   @ApiOkResponse()
   async getLookUp(@Res() res: Response
   ) {
    

      return this.adminService.getlookUp(res);
   }


   @Post('checkRole')
   @ApiOkResponse()
   async checkRole(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) tokenDto: TokenDto, @Res({ passthrough: true }) res: Response
   ) {
      const token = tokenDto.token
      console.log(token)
      const data = await this.jwtService.verifyAsync(token);
      const user = await this.adminService.findId(data['id']);
      // const user = await this.adminService.findId("1");
      
      const role = user.userP[0].position
      const roleUser = this.adminService.checkRoleUser(role,res);
      console.log(roleUser)
      return roleUser
   }


   @Get('getUser')
   @ApiOkResponse()
   async getUsers(@Res() res: Response
   ) {
      

      return this.adminService.getuser(res);
   }



   @Post('createUser')
   @ApiOkResponse()
   async createUser(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) userDto: UserDto, @Res({ passthrough: true }) res: Response
   ) {
      console.log(userDto)

      return this.adminService.createUser(userDto,res);

      
   }

  




}