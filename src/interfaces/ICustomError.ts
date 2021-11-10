/**
 *
 * @export
 * @interface ICustomError
 */

 export interface ICustomError {
    method:string,
    httpStatus:number,
    responseBody:object,
}