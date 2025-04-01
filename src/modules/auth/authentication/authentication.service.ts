import { PrismaService } from '@/common/datebase/prisma.extension';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly logger: Logger,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2,
  ) {}
}
