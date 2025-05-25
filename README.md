Para poder ejecutar el backend se tiene que usar las variables de entorno, en un archivo .env :
PORT=8088
MONGODB_ATLAS=mongodb+srv://marcos242016:FI20KADeNak4xtf6@jovenesmedeacluster.w764l.mongodb.net/?retryWrites=true&w=majority&appName=jovenesMedeaCluster
SECRET_KEY="clave_secreta"

-----------------------------------------------------------------------------------------------------------------------
Para poder consumir los enpoinds , tanto por swagger o postman , primero se debera hacer un login, con las credenciales 
url = http://localhost:8088/login

{
    "usuario":"marco",
    "password":"1234"
}

