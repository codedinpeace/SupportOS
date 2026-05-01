import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import { config } from './config/config.js';
import connectDB from './db/mongoDB.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieParser from 'cookie-parser';
import businessRouter from './routes/business.routes.js';


const app = express();
app.use(express.json());
app.use(cookieParser())

connectDB() 

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));

app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback" 
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use(morgan('dev'));
app.use(cookie());

// Routes
app.use('/api/auth', authRouter);   
app.use('/api/business', businessRouter)



export default app;

