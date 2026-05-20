import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@shared/entities'
import { returnUserObject, TUser } from '@shared/objects/return-user.object'

@Injectable()
export class UsersRepository {
	constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

	async findById(id: string): Promise<TUser | null> {
		const user = (await this.usersRepository.findOne({
			where: {
				id,
			},
			select: returnUserObject,
		})) as TUser | null

		return user
	}

	async create(data: Partial<UserEntity>) {
		const userInstance = this.usersRepository.create(data)
		const newUser = await this.usersRepository.save(userInstance)

		return newUser
	}
}
