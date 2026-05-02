import { crawlAndSave } from "../config/crawl.config.js";
import sendEmail from "../config/sendEmail.config.js";
import businessModel from "../models/business.model.js";
import { generateInviteCode } from "../utils/generate-invite-code.js";
import { config } from "../config/config.js";
import sendTokenResponse from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import { tryAbsoluteURL } from "crawlee";
import jwt from "jsonwebtoken";

export const businessRegister = async (req, res) => {
  try {
    const { organization, websiteURL, businessEmail, businessPassword } =
      req.body;

    const existingBusiness = await businessModel.findOne({businessEmail})

    if (existingBusiness)
      return res
        .status(403)
        .json({ message: "Business with that email already exists" });

    const registeredBusiness = await businessModel.create({
      organization,
      websiteURL,
      businessEmail,
      businessPassword,
      isCrawling: "crawling",
    });

    // 1. Start crawling (Fire and Forget)
    try {
      crawlAndSave(registeredBusiness._id, websiteURL);
    } catch (crawlErr) {
      console.error("Crawl trigger error:", crawlErr.message);
    }

    // 2. Generate Token
    const token = jwt.sign({ businessId: registeredBusiness._id }, config.JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 3. Send Success Response Immediately
    res.status(201).json({
      message: "Business registered successfully. We are processing your website data.",
      user: {
        id: registeredBusiness._id,
        organization: registeredBusiness.organization,
        email: registeredBusiness.businessEmail,
        role: 'business'
      }
    });

    // 4. Background Tasks (No await)
    try {
      // Send Email in background
      sendEmail(
        businessEmail,
        `Verify Your SupportAI Account`,
        `Hi ${organization}, please verify your email using this link: http://localhost:8000/api/business/verify-email?token=${token}`,
        `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Verify Your Email, ${organization}!</h2>
          <p style="color: #555;">Please verify your email address to activate your account.</p>
          <div style="text-align: center; margin: 24px 0;">
              <a href="http://localhost:8000/api/business/verify-email?token=${token}" 
                 style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                  Verify Email
              </a>
          </div>
        </div>`
      ).catch(e => console.error("Background Email Error:", e.message));

      // Start Crawling in background
      crawlAndSave(registeredBusiness._id, websiteURL).catch(e => console.error("Background Crawl Error:", e.message));

    } catch (bgError) {
      console.error("Background processing error:", bgError.message);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const verifyEmail = async (req,res) => {
    try {
        const {token} = req.query
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const userId = decoded.businessId

        const business = await businessModel.findOne({_id:userId})
        if(!business) return res.status(403).json({message:"business with this token doesn't exist"})
            business.isVerified = true
            await business.save()
            if(business.isVerified){
                return res.redirect("http://localhost:5173/login")
            }
    } catch (error) {
        res.status(400).json({message:error.message})
    }   
}

export const businessLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingBusiness = await businessModel.findOne({ businessEmail: email }).select("+businessPassword");

    if (!existingBusiness)
      return res
        .status(404)
        .json({ message: "Business with that email doesn't exist" });

    const comparedPassword = await bcrypt.compare(
      password,
      existingBusiness.businessPassword,
    );
    if (!comparedPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    if(!existingBusiness.isVerified) return res.status(403).json({message:"business not verified"})

        await sendTokenResponse(existingBusiness, res)
        return res.status(200).json({
          message: "Business loggedIn successfully",
          user: {
            id: existingBusiness._id,
            fullname: existingBusiness.organization,
            email: existingBusiness.businessEmail,
            role: 'business'
          }
        })
  } catch (error) {
    res.status(400).json({message:error.message})
  }
};

export const inviteAgents = async (req,res) => {
    try {      

        const businessId = req.business.businessId

        const business = await businessModel.findOne({_id:businessId})
        if(!business) return res.status(400).json({message:'Bad request'})

            const code = generateInviteCode()

             await sendEmail(
            business.businessEmail,
            `Your SupportAI Agent Invite Code`,
            `Hi ${organization}, your invite code is: ${code}`,
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Welcome to SupportAI, ${organization}!</h2>
                <p style="color: #555;">Your agent invite code is:</p>
                <div style="background-color: #f4f4f4; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
                    <h1 style="letter-spacing: 8px; color: #333; margin: 0;">${code}</h1>
                    <p>Share this code to your agent!</p>
                </div>
                <a href="${config.FRONTEND_URL}/agent/register" 
                   style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                    Agent Registration Page
                </a>
            </div>`
        )   

    business.inviteCode = code;
    await business.save();
        res.status(200).json({message:"invitation code sent successfully"})

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const logoutBusiness = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });
  return res.status(200).json({ message: 'Business logged out successfully' });
};
