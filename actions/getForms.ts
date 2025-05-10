"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getForms = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "Please sign in" };
  }

  try {
    const forms = await prisma.form.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (forms.length === 0) {
      return { success: false, message: "No forms found" };
    }

    return {
      success: true,
      message: "Forms fetched successfully",
      data: forms,
    };
  } catch (error) {
    console.error("Error fetching forms:", error);
    return { success: false, message: "Error fetching forms" };
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma after query
  }
};
