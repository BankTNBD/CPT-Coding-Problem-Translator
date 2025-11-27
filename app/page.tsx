"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText, Languages, Lightbulb, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyze = async (type: "summary" | "translation" | "hint" | "all") => {
    if (!text && !image) return;
    setLoading(true);
    setResult("");

    try {
      // Temporarily set API key in localStorage or pass it if needed, 
      // but for now we rely on env or user input if we were to implement that fully.
      // The backend uses process.env.NEXT_PUBLIC_GEMINI_API_KEY.
      // If we want to support client-side key, we'd need to pass it to the API or use it in client-side calls.
      // For this MVP, we'll assume the env var is set or the user sets it in the code/env.

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, image, type }),
      });

      const data = await response.json();
      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">ตัวช่วยแก้โจทย์โค้ด</h1>
        <p className="text-neutral-500">สรุป แปล และขอคำใบ้สำหรับโจทย์ปัญหาการเขียนโปรแกรม</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="h-fit shadow-sm border-neutral-200">
          <CardHeader>
            <CardTitle>ใส่โจทย์ปัญหา</CardTitle>
            <CardDescription>วางข้อความหรืออัปโหลดรูปภาพหน้าจอ</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="text">ข้อความ</TabsTrigger>
                <TabsTrigger value="image">รูปภาพ</TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <Textarea
                  placeholder="วางโจทย์ปัญหาของคุณที่นี่..."
                  className="min-h-[300px] resize-none focus-visible:ring-neutral-400"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="image">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg h-[300px] bg-neutral-50 hover:bg-neutral-100 transition-colors relative overflow-hidden">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  {image ? (
                    <img src={image} alt="Uploaded" className="h-full w-full object-contain" />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="mx-auto h-10 w-10 text-neutral-400 mb-2" />
                      <p className="text-sm text-neutral-500">คลิกหรือลากไฟล์มาวางเพื่ออัปโหลดรูปภาพ</p>
                    </div>
                  )}
                </div>
                {image && (
                  <Button variant="ghost" size="sm" onClick={() => setImage(null)} className="mt-2 w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                    ลบรูปภาพ
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => analyze("summary")}
                disabled={loading || (!text && !image)}
                className="hover:bg-neutral-100"
              >
                <FileText className="mr-2 h-4 w-4" /> สรุป
              </Button>
              <Button
                variant="outline"
                onClick={() => analyze("translation")}
                disabled={loading || (!text && !image)}
                className="hover:bg-neutral-100"
              >
                <Languages className="mr-2 h-4 w-4" /> แปล
              </Button>
              <Button
                variant="outline"
                onClick={() => analyze("hint")}
                disabled={loading || (!text && !image)}
                className="hover:bg-neutral-100"
              >
                <Lightbulb className="mr-2 h-4 w-4" /> คำใบ้
              </Button>
            </div>
            <Button
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              onClick={() => analyze("all")}
              disabled={loading || (!text && !image)}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              วิเคราะห์ทั้งหมด
            </Button>
          </CardFooter>
        </Card>

        {/* Output Section */}
        <Card className="h-fit min-h-[500px] shadow-sm border-neutral-200">
          <CardHeader>
            <CardTitle>ผลลัพธ์การวิเคราะห์</CardTitle>
            <CardDescription>ข้อมูลที่ได้จาก AI จะแสดงที่นี่</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-neutral max-w-none overflow-auto max-h-[600px]">
            {result ? (
              <ReactMarkdown>{result}</ReactMarkdown>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-neutral-400">
                <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                <p>พร้อมวิเคราะห์โจทย์ของคุณแล้ว</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
