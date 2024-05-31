export interface SigupBody {
    name:string,
    email:string,
    phone_number:string,
    password:string
}

export interface LoginBody {
    email:string,
    password:string
}