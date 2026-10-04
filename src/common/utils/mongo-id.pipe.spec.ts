import { BadRequestException } from '@nestjs/common'

import { MongoIdPipe } from './mongo-id.pipe'

describe('MongoIdPipe', () => {

    const pipe = new MongoIdPipe()
    it('accepts ObjectIds and rejects malformed route identifiers', () => {
        expect(pipe.transform('65a000000000000000000001')).toBe('65a000000000000000000001')
        for (const id of ['invalid', '', '65a00000000000000000000z', 'abcdefghijkl']) {
            expect(() => pipe.transform(id)).toThrow(BadRequestException)
        }
    })

})
