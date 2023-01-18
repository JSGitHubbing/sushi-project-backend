import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {

    constructor(
        private configService: ConfigService
    ) { }

    public async encrypt(data: string): Promise<string> {
        const saltRounds = this.configService.get<number>('bcrypt.saltRounds');
        return await bcrypt.hash(data, saltRounds);
    }

    public async verify(data: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(data, hash);

        return result;
    }
}
