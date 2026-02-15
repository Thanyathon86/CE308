/** @type {import('tailwindcss').Config} */
module.exports = {
  // กำหนด path ของไฟล์ที่มี class ของ NativeWind
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // ใช้ preset ของ NativeWind
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // ตัวอย่างสีหลัก
        secondary: "#F59E0B", // ตัวอย่างสีรอง
      },
      fontFamily: {
        sans: ["Inter", "system-ui"], // เพิ่มฟอนต์
      },
    },
  },
  plugins: [],
}