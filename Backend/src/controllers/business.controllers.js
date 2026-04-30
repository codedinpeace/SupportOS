import { crawlAndSave } from "../config/crawl.config.js"
import sendEmail from "../config/sendEmail.config.js"
import businessModel from "../models/business.model.js"
import { generateInviteCode } from "../utils/generate-invite-code.js"
import { config } from "../config/config.js"
import sendTokenResponse from "../utils/generateToken.js"

export const businessRegister = async (req, res) => {
    try {
        const { organization, websiteURL, businessEmail, businessPassword } = req.body

        if(businessEmail) return res.status(403).json({message:"Business with that email already exists"})

        const registeredBusiness = await businessModel.create({
            organization,
            websiteURL,
            businessEmail,
            businessPassword,
            isCrawling: 'crawling'
        })

        // fire and forget
        crawlAndSave(registeredBusiness._id, websiteURL)

        const code = generateInviteCode()

        await sendEmail(
            businessEmail,
            `Your SupportAI Agent Invite Code`,
            `Hi ${organization}, your invite code is: ${code}`,
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Welcome to SupportAI, ${organization}!</h2>
                <p style="color: #555;">Your agent invite code is:</p>
                <div style="background-color: #f4f4f4; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
                    <h1 style="letter-spacing: 8px; color: #333; margin: 0;">${code}</h1>
                </div>
                <a href="${config.FRONTEND_URL}/agent/register" 
                   style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                    Agent Registration Page
                </a>
            </div>`
        )

        registeredBusiness.inviteCode = code
        await registeredBusiness.save()

        sendTokenResponse(registeredBusiness, res)
        res.status(201).json({registeredBusiness})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


