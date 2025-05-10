"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

type InitialState = {
    message: string;
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  };

// Correct the typing for prevState
export const generateForm = async (
  prevState: InitialState, // Use InitialState type here
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const schema = z.object({
      description: z.string().min(1, "Description is required"),
    });

    const result = schema.safeParse({
      description: formData.get("description"),
    });

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: result.error.errors,
      };
    }

    const description = result.data.description;


    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: "GeminiAi API key not found" };
    }

    const prompt = `
    Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
    
    {
      "formTitle": "string", // The title of the form
      "formFields": [          // An array of fields in the form
        {
          "type": "string",  // Type of the field (e.g., "text", "email", "password", "number", "radio", "checkbox", "select", "textarea","date").
          "label": "string", // The label to display for the field
          "name": "string",   // The unique identifier for the field (used for form submissions)
          "placeholder": "string", // The placeholder text for the field
          "options": ["string"] // (Optional) Only required if type is "radio", "checkbox", or "select". Represents available choices.
        }
      ]
    }
    
    Requirements:
    - Use only the given keys: "formTitle", "formFields", "type", "label", "name", "placeholder", "options".
    - Always include at least 3 fields in the "formFields" array.
    - Ensure at least one field is "email" if relevant to the form type.
    - Ensure numerical inputs use "number" type.
    - Use "textarea" for large text inputs.
    - Use "radio", "checkbox", or "select" types when applicable and include "options" with meaningful choices.
    - Keep the field names consistent across every generation for reliable rendering.
    - Provide meaningful placeholder text for each field based on its label.
    - Return only the **JSON object**, without additional text, comments, or explanations.
    - Create a form based on the following description: ${description}
    `;
    

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      return { success: false, message: "AI response is empty or invalid" };
    }
    

    let formContent = response.candidates[0]?.content?.parts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((part: any) => part.text)
      .join('') || '';

    // Remove Markdown code block syntax
    formContent = formContent.replace(/```json|```/g, '').trim();


    let formJsonData;
    try {
      formJsonData = JSON.parse(formContent);
    } catch (error) {
      console.log("Error parsing JSON:", error);
      return { success: false, message: "Failed to parse data to JSON" };
    }

    const form = await prisma.form.create({
      data: {
        ownerId: user.id,
        content: formJsonData ? formJsonData : null,
      },
    });

    return {
      success: true,
      message: "Form generated successfully",
      data: form,
    };
  } catch (error) {
    console.error("Error generating form:", error);
    return { success: false, message: "An error occurred generating form" };
  }
};
