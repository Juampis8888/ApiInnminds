import cors from "cors";

const cors_API = (_app:any) => {
    let whiteList = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3005',
        'https://master.d161vines32rcl.amplifyapp.com/',
        '*',
        undefined
    ];
    console.log("Cors")
    let corsOptions = {
        
        origin: function (origin: any, callback: any) {
            if (whiteList.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log(origin);
                callback(new Error('Not allowed by CORS'));
            }
        }
    };

    return cors(corsOptions);
}

export default cors_API;
