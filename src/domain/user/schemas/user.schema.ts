import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import bcrypt from 'bcryptjs'
import { Document } from 'mongoose'

import { UserRole } from '../enums/user-role.enum'

@Schema({ collection: 'users', timestamps: true })
export class User {

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, enum: UserRole, default: UserRole.USER })
    role: UserRole

}

export type UserDocument = User & Document & {
    comparePassword(candidatePassword: string): Promise<boolean>
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', { virtuals: true })
UserSchema.set('toObject', { virtuals: true })

// Pre-save hook to hash password
UserSchema.pre<UserDocument>('save', function (next) {
    if (!this.isModified('password')) return next()

    const saltRounds: number = 10

    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

UserSchema.method('comparePassword', function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
})
