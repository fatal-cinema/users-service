import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getTypeOrmConfig } from '@config/factories'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmConfig,
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
