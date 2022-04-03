import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: '.env'});


const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('DB conectada');
    } catch (error) {
        console.log(`Ocurrio un error al tratar de conectarse a la base de datos -  ${error}`);
        process.exit(1);
    }
}

export default conectarDB;