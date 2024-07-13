const {validationResult}= require("express-validator");

module.exports =  validatorMiddleware = (req, res , next) => {
    const error = validationResult(req);
    if ( !error.isEmpty()) {
      return res.status(404).json({"mes" : "validation Error", "Error":error.array()})
    }
    next()
}
