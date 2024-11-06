"use server";

import { User } from "@prisma/client";
import prisma from "../../../prisma";
import { hashPassword } from "../password/password";
import sendMail from "../mail";
import { EmailVerificationTemplate } from "@/components/emailVerification-template";
import { createToken, verifyJWT } from "../jwt";
import { ResetPasswordTemplate } from "@/components/reset-password-template";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  try {
    const password = await hashPassword(user.password); // password hashing
    console.log(user, "user");
    console.log(password, "password");
    const result = await prisma.user.create({
      data: { ...user, password: password },
    });
    const token = createToken({
      id: result?.id,
    });
    const activationUrl = `${process.env.CLIENT_BASE_URL}/emailVerification/${token}`;
    await sendMail({
      to: result.email!,
      subject: "Activate Your Account",
      body: EmailVerificationTemplate({
        verificationLink: activationUrl,
      }),
    });
    return {
      status: true,
      data: result,
      message: "Verification Email Sent!",
    };
  } catch (error) {
    if (
      error.code === "P2002" &&
      error.meta &&
      error.meta.target.includes("email")
    ) {
      // Customize the message for duplicate email error
      return {
        status: false,
        message: "This email is already in use. Please use a different email.",
      };
    } else {
      console.error("Detailed error:", error); // Logs full error for debugging
      // Catch-all for other errors
      return {
        status: false,
        message: "An error occurred. Please try again later.",
      };
    }
  }
}

type ActivateUser = (
  token: string
) => Promise<"userNotExist" | "alreadyActivated" | "success" | "error">;
export const activateUser: ActivateUser = async (token) => {
  const payload = verifyJWT(token);
  const userId = payload?.id;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return "userNotExist";
    if (user.emailVerified) return "alreadyActivated";
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    return "success";
  } else {
    return "error";
  }
};

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) throw new Error("The User Does Not Exist!");
  const token = createToken({ id: user?.id });
  const resetUrl = `${process.env.CLIENT_BASE_URL}/resetPassword/${token}`;
  await sendMail({
    to: user?.email!,
    subject: "Reset Your Password",
    body: ResetPasswordTemplate({
      resetLink: resetUrl,
    }),
  });
  return {
    success: true,
    data: user,
    message: "Reset Password Email Sent!",
  };
}

type ResetPasswordFunc = (
  token: string,
  password: string
) => Promise<"userNotExist" | "success">;
export const resetPassword: ResetPasswordFunc = async (
  token: string,
  password: string
) => {
  const payload = verifyJWT(token);
  if (!payload) return "userNotExist";
  const userId = payload.id;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
  if (user) return "success";
  else throw new Error("Something went wrong!");
};
