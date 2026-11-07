import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class MongoIdPipe implements PipeTransform<string, string> {

    transform(value: string): string {
        if (!/^[a-f\d]{24}$/i.test(value) || !Types.ObjectId.isValid(value)) {
            throw new BadRequestException('Invalid recipe identifier')
        }
        return value
    }

}
