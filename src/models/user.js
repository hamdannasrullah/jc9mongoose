const mongoose = require ('mongoose')
const validator = require ('validator')
const bcrypt = require ('bcrypt')

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true, // artinya wajib diisi
        trim: true // mengahapus whitespace di awal dan di akkhir data
    },
    email: {
        // Latihan
        // Harus diisi
        // hapus spasi di depan dan akhir
        // harus huruf kecil semua
        type: String,
        required: true,
        // unique: true,
        index: {
            unique: true  // alamat email tidak boleh sama
        },       
        trim: true,
        lowercase: true,
        validate(value) {// value: data yang diinput user harus Email
            var hasil = validator.isEmail(value)

            if(!hasil){
                throw new Error('Bukan alamat Email')
            }
        }
    },
    password: {
        // Harus diisi
        // hapus sepasi di awal dan akhir
        // minimal 7 karakter
        // tidak boleh mengandung kata "password": validate
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error ("Tidak boleh mengandung kata Password ")
            }
        }
    },
    age: {
        // Tidak boleh string kosong, dan harus positive number
        type: Number,
        unique: true,
        default: 0, // default value jika user tidak input data angka age
        validate(value){
            if(value === null){
                throw new Error ("Age tidak boleh string kosong")
            } else if (value < 0){
                throw new Error ("Age tidak boleh negatif")
            }
            
            }
        },
        avatar: { // Photo profil
            type: Buffer
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId, // Array yg memiliki ObjectID yg dimiliki Task
            ref: 'Task'        
        }] 
    
})


// Model Method
userSchema.statics.loginWithEmail = async (da_email, da_password) => {

    const user = await User.findOne({email: da_email})
    
    if(!user){ // user tidak di temukan
        throw new Error('User not found')
    }

    // da_password: satuduatiga
    // user.password: $2b$08$efjBzkL
    // match: true or false
    const match = await bcrypt.compare(da_password, user.password)

    if(!match){
        throw new Error('Wrong password')
    }

    return user

     /*
    {
        email: blabla@bala.com,
        password: 2$sdTy^7gdsesd
    }
    email: blabla@bala.com
    password: 1234567
    */
}



// Membuat function yang akan dijalankan sebelum proses user.save()
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){ // true saat pertama dibuat dan mengalami perubahan
        var hasil = await bcrypt.hash(user.password, 8)
        user.password = hasil // karakter hasil hash
    }

    next() // lanjut ke proses save()

})


// const User = mongoose.model('User', {}) ==> User Schema dipisah di atasnya untuk memudahkan

const User = mongoose.model('User', userSchema) // db.user.find()

module.exports = User