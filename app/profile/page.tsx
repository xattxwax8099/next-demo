"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://via.placeholder.com/150"
  );

  const profile = {
    id: 1,
    name: "Nattawan Sae-Aieo",
    email: "nattawan@example.com",
    role: "Computer Engineering Student",
    location: "Phuket, Thailand",
    bio: "ชอบทำโปรเจกต์ IoT, วิเคราะห์ข้อมูล และทำเว็บเล็กๆ เล่น ๆ",
  };

  // ฟังก์ชันอ่านไฟล์จาก input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string); // base64 ของรูป
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <div className="flex gap-6">
          <img
            src={avatarUrl}
            alt={`${profile.name} avatar`}
            className="w-32 h-32 rounded-full object-cover shadow-sm"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.role}</p>
            <p className="text-sm text-gray-400">{profile.location}</p>
            <p className="mt-2 text-sm text-gray-600">{profile.email}</p>

            <p className="mt-4 text-gray-700 leading-relaxed">{profile.bio}</p>

            {/* อัปโหลดไฟล์รูปใหม่ */}
            <div className="mt-6">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="mb-2"
              />
              <button
                onClick={() => alert("เปลี่ยนรูปเรียบร้อย!")}
                className="px-4 py-2 rounded-lg border border-transparent bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                บันทึกรูปโปรไฟล์
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
