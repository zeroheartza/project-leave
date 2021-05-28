import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { adminController } from './controller/admin.controller'
import { tbUser } from './entities/tbUser.entity';
import { tbLeave } from './entities/tbLeave.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from "@nestjs/jwt";
import { tbUserProfile } from './entities/tbUserProfile';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbUser,tbUserProfile


    ])
    , ScheduleModule.forRoot(),
    JwtModule.register({
      secret: 'secret',
    })
  ],
  controllers: [

    adminController,


  ],
  providers: [
    UserService,

    AdminService,


  ]
})
export class UserModule { }

