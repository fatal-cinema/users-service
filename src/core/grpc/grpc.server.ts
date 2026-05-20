import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport, type MicroserviceOptions } from '@nestjs/microservices'

import { grpcLoader, grpcPackages, grpcProtoPaths } from './grpc.options'

export function createGrpcServer(app: INestApplication, config: ConfigService) {
	const grpcHost = config.getOrThrow<string>('GRPC_HOST')
	const grpcPort = config.getOrThrow<number>('GRPC_PORT')

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: grpcPackages,
			protoPath: grpcProtoPaths,
			url: `${grpcHost}:${grpcPort}`,
			loader: grpcLoader,
		},
	})
}
