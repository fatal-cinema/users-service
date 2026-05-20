import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@shared/entities'
import { returnUserObject, TUser } from '@shared/objects/return-user.object'
import { BaseRepository } from '@shared/repositories'

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
	constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {
		super(usersRepository)
	}

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
		const newUser = await this.saveOrFail(userInstance)

		return newUser
	}

	async update(id: string, data: Partial<UserEntity>) {
		await this.updateOrFail({ id }, data)
		const updatedUser = await this.findById(id)

		return updatedUser
	}
}
