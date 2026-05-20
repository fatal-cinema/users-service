import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IS_DEV_ENV } from '@shared/utils'

import { DatabaseModule } from './database/database.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: !IS_DEV_ENV,
		}),
		DatabaseModule,
	],
})
export class CoreModule {}
