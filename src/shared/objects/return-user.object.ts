import { FindOptionsSelect } from 'typeorm'

import { UserEntity } from '@shared/entities'

export const returnUserObject = {
	id: true,
	avatar: true,
	name: true,
} satisfies FindOptionsSelect<UserEntity>

export type TUser = Pick<UserEntity, keyof typeof returnUserObject>
