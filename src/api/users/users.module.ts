import { AccountGrpcClient, GrpcModule } from '@fatal-cinema/common'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '@shared/entities'

import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), GrpcModule.register(['ACCOUNT_CLIENT'])],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AccountGrpcClient],
})
export class UsersModule {}
