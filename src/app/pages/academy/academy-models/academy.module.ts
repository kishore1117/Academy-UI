export interface JwtPayload {
    email:string,
    franchise:number,
    iat:number,
    number:number,
    role:string,
    username:string
  }

  export interface locationResponse {
        id: number,
        name: string,
        active: boolean,
        reatedat: string,
        updatedat: string,
        phone_number: string,
        logo_url: string,
        address: string,
        city: string,
        state: string,
        zip_code: string,
        country: string,
        franchise_id: number
  }