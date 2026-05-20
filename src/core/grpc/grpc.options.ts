import { PROTO_PATHS } from '@fatal-cinema/contracts'
import { USERS_V1_PACKAGE_NAME } from '@fatal-cinema/contracts/gen/users'
import type { GrpcOptions } from '@nestjs/microservices'

export const grpcPackages = [USERS_V1_PACKAGE_NAME]

export const grpcProtoPaths = [PROTO_PATHS.USERS]

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
}
