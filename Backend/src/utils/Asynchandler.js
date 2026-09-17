// const Asynchandler = (requesthandler)=>{
//         return (req,res,next)=>{
//             Promise
//             .resolve(requesthandler(req,res,next))
//             .catch((err) => next(err))
//         }
// }
// export {Asynchandler}


// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }


// export { asyncHandler }
// const Asynchandler=(requestHandler)=>{
//     return (req,res,next)=>{
//          Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }
// }