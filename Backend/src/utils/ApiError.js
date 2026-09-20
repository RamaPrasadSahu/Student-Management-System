class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.statuscode = statusCode
        this.status = statusCode
        this.message = message
        this.data = null
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}

// class ApiError extends Error{
//     constructor(
//         statuscode,
//         message = "Something Went Wrong",
//         errors = [],
//         stack = ""
//     ){
//         super(message)
//         this.statuscode = statuscode,
//         this.message = message,
//         this.data = null,
//         this.success = false,
//         this.errors = errors
//         if(stack){
//             this.stack = stack
//         }
//         else{
//             Error.captureStackTrace(this,this.constructor)
//         }
//     }
// }
// export {ApiError}
// class ApiError extends Error{
//     constructor(
//         statuscode,
//         message = " Something Went Wrong",
//         eroors = [],
//         stack = ""
//     ){
//         super(message)
//         this.statuscode = statuscode,
//         this.message = message,
//         this.data = null,
//         this.success = false,
//         this.errors = this.errors
//         if(stack){
//             this.stack =stack
//         }
//         else{
//             Error.captureStackTrace(this,this.constructor)
//         }
//     }
// }
// export {ApiError}