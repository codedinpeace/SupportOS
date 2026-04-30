import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export default async function sendTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      contact: user.contact,
    },
  });
}