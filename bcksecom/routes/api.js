const express = require('express');
const router = express.Router();

let passport = require('passport');
let passportJWT = require('passport-jwt');

let extractJWT = passportJWT.ExtractJwt;
let strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next)=>{
       var user = payload;
       return next(null, user);
    }
  )
)

const jwtAuthMiddleware = passport.authenticate('jwt', {session:false});

/**
 * Router Principal para el api de SECOM
 *
 * @author Orlando J Betancourth
 * @date 2020-10-05
 * @namespace api
 */

const securityRoutes = require('./api/seguridad');
const productosRoutes = require('./api/productosdb');


router.use('/security', securityRoutes);
router.use('/productos', jwtAuthMiddleware, productosRoutes);

module.exports = router;
