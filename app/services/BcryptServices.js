import bcrypt from 'bcrypt'

class BcryptServices{
    genSalt=10;
    async hashPassword(data){
        const hashedData  = await bcrypt.hash(data,Number(this.genSalt))
        return hashedData
    }
    async compareHashedString(data,hashedString){
        const hashedData  = await bcrypt.compare(data,hashedString)
        return hashedData
    }
}

export default new BcryptServices