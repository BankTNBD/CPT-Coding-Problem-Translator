import { model } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, image, type } = await req.json();

        let prompt = "";
        if (type === "summary") {
            prompt = "สรุปโจทย์ปัญหานี้ให้เข้าใจง่าย อธิบายงานหลักและสิ่งที่ต้องทำ เป็นภาษาไทย";
        } else if (type === "translation") {
            prompt = "แปลโจทย์ปัญหานี้เป็นภาษาไทย โดยคงคำศัพท์เทคนิคไว้ แต่ให้อธิบายบริบทเป็นภาษาไทย";
        } else if (type === "hint") {
            prompt = "ให้คำใบ้สำหรับแก้โจทย์ปัญหานี้ เป็นภาษาไทย อย่าให้โค้ดเฉลยเต็มๆ แต่ให้แนะนำอัลกอริทึมหรือโครงสร้างข้อมูลที่ควรใช้";
        } else {
            prompt = "วิเคราะห์โจทย์ปัญหานี้ ให้สรุป แปลเป็นไทย และให้คำใบ้สำหรับแก้ปัญหา ทั้งหมดเป็นภาษาไทย";
        }

        // Add user text if provided
        if (text) {
            prompt += `\n\nProblem Description:\n${text}`;
        }

        const parts: any[] = [prompt];

        // Add image if provided
        if (image) {
            // Image is expected to be a base64 string without the data prefix for the API, 
            // but usually frontend sends data:image/...;base64,...
            // We need to strip the prefix if present.
            const base64Data = image.split(",")[1] || image;
            const mimeType = image.split(";")[0].split(":")[1] || "image/png";

            parts.push({
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            });
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const output = response.text();

        return NextResponse.json({ result: output });
    } catch (error) {
        console.error("Error analyzing problem:", error);
        return NextResponse.json(
            { error: "Failed to analyze the problem. Please check your API key and try again." },
            { status: 500 }
        );
    }
}
