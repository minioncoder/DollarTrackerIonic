import {IUser} from './user.model'

export interface ILoginResponse{
    token:string;
    success:boolean;
    message:string;
    user:IUser
}