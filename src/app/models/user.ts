export interface User{
    email: string;
    password: string;
}

export interface MyProfile {
   uid: string,
   name: string,
   email: string,
   google: boolean,
   favorites: [],
   status: boolean,
   account: string,
   role: string, 
   company?: {
        workstation: string,
        company: string,
   }
}