import { RpcStatus } from '@fatal-cinema/common'
import { RpcException } from '@nestjs/microservices'
import { FindOptionsWhere, ObjectLiteral, QueryFailedError, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export abstract class BaseRepository<T extends ObjectLiteral & { id: string }> {
	constructor(protected readonly repository: Repository<T>) {}

	protected async saveOrFail(entity: T): Promise<T> {
		try {
			return await this.repository.save(entity)
		} catch (error) {
			if (error instanceof QueryFailedError && (error as any).code === '23505') {
				throw new RpcException({ code: RpcStatus.ALREADY_EXISTS, details: `${this.repository.metadata.name} already exists` })
			}
			throw error
		}
	}

	protected async updateOrFail(options: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<void> {
		const result = await this.repository.update(options, data)

		if (result.affected === 0) {
			throw new RpcException({ code: RpcStatus.NOT_FOUND, details: `${this.repository.metadata.name} not found` })
		}
	}

	protected async findOneOrFail(options: FindOptionsWhere<T>): Promise<T> {
		const entity = await this.repository.findOne({ where: options })

		if (!entity) {
			throw new RpcException({ code: RpcStatus.NOT_FOUND, details: `${this.repository.metadata.name} not found` })
		}

		return entity
	}
}
