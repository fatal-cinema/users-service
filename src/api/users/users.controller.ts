import {
	USERS_SERVICE_NAME,
	UsersServiceController,
	type CreateUserRequest,
	type CreateUserResponse,
	type GetMeRequest,
	type GetMeResponse,
} from '@fatal-cinema/contracts/gen/users'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { UsersService } from './users.service'

@Controller()
export class UsersController implements UsersServiceController {
	constructor(private readonly usersService: UsersService) {}

	@GrpcMethod(USERS_SERVICE_NAME, 'GetMe')
	async getMe(request: GetMeRequest): Promise<GetMeResponse> {
		return this.usersService.getMe(request)
	}

	@GrpcMethod(USERS_SERVICE_NAME, 'CreateUser')
	async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
		await this.usersService.create(request)

		return { ok: true }
	}
}
