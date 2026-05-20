import { AccountGrpcClient, nullToUndefined, RpcStatus } from '@fatal-cinema/common'
import { CreateUserRequest, GetMeRequest, GetMeResponse, PatchUserRequest, PatchUserResponse } from '@fatal-cinema/contracts/gen/users'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountGrpcClient
	) {}

	async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		const { id } = data

		const user = await this.usersRepository.findById(id)

		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found',
			})

		const account = await this.accountClient.call('getAccount', { id })

		const userWithoutNulls = nullToUndefined(user)
		return {
			user: {
				id: user.id,
				name: userWithoutNulls.name,
				avatar: userWithoutNulls.avatar,
				email: account.email,
				phone: account.phone,
			},
		}
	}

	async create(data: CreateUserRequest) {
		const { id } = data

		await this.usersRepository.create({ id: data.id })
	}

	async patchUser(data: PatchUserRequest): Promise<PatchUserResponse> {
		const { userId, name } = data

		await this.usersRepository.update(userId, { ...(!!name && { name }) })

		return { ok: true }
	}
}
