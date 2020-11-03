var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

class SeguridadModel {
  constructor() {
    this.collection = null;
      MongoDB.getDb().then(async (db)=>{
        this.collection =  await db.collection('usuarios');
        if (process.env.ENSURE_INDEX == "1") {
          await this.collection.createIndex({ "email": 1 }, { unique: true });
        }
      }
    ).catch((ex)=>{
        throw(ex);
      }
    )
  }
  async addUsuario( data ) {
    const {email, password} = data;
    try {
      let nuevo = {
        "email": email,
        "password": bcrypt.hashSync(password, 10),
        "lastlogin": 0,
        "lastpwdchg": 0,
        "pwdexp": new Date().getTime() + (1000*60*60*24*90), /* mils, s , m, h, d */
        "oldpwd":[],
        "roles":["public"]
      }
      let rslt = await this.collection.insertOne(nuevo);
      return rslt;
    } catch(ex){
      throw(ex);
    }
  }

  async getUserByEmail(email){
    try{
      const filter = {"email":email};
      let User = await this.collection.findOne(filter);
      return User;
    }catch(ex){
      throw(ex);
    }
  }
  /**
   * Compara la contraseña y devuelve true si son identicos.
   *
   * @author Orlando J Betancourth A 
   * @date 2020-11-02
   * @param {string} rawPswd   Contraseña que el usuario envia
   * @param {string} crptoPswd Contraseña guardad en la DB
   * @memberof SeguridadModel
   */
  async comparePassword(rawPswd, crptoPswd){
    try{
      //return bcrypt.compareSync(rawPswd, crptoPswd);
      return await bcrypt.compare(rawPswd, crptoPswd);
    }catch(ex){
      throw(ex);
    }
  }

}

module.exports = SeguridadModel;
