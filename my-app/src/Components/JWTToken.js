export const IsLogged=()=>GetToken()!==null;
export const GetToken=()=>sessionStorage.getItem("jwt_token");
export const SetToken=(token)=>sessionStorage.setItem("jwt_token",token);
export const ClearToken=()=>sessionStorage.removeItem("jwt_token")
