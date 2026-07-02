"use client";

import {
  User,
  Mail,
  Phone,
  Hash,
  Building2,
  Link2,
  GraduationCap,
  Gauge,
} from "lucide-react";
import { SpotlightCard } from "./effects";

const DEPARTMENTS = [
  "Information Technology",
  "Computer Engineering",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics Engineering",
  "Production Engineering",
];

const YEARS = ["1st", "2nd", "3rd", "4th"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";
const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 peer-focus:text-emerald-400";

export default function PersonalDetails({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
            <User size={20} />
          </span>
          Personal Details
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Please enter your personal and academic information.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`peer ${inputClass}`}
            />
            <User className={iconClass} size={18} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            Email Address <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              className={`peer ${inputClass}`}
            />
            <Mail className={iconClass} size={18} />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            Phone Number <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="9876543210"
              className={`peer ${inputClass}`}
            />
            <Phone className={iconClass} size={18} />
          </div>
        </div>

        {/* ID Number */}
        <div>
          <label className={labelClass}>
            ID Number <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="IdNumber"
              value={formData.IdNumber}
              onChange={handleChange}
              placeholder="22IT001"
              className={`peer ${inputClass}`}
            />
            <Hash className={iconClass} size={18} />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className={labelClass}>
            Engineering Department <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`peer ${inputClass} appearance-none`}
            >
              <option value="" className="bg-[#05080a] text-zinc-400">
                Select Department
              </option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className="bg-[#05080a] text-zinc-100">
                  {dept}
                </option>
              ))}
            </select>
            <Building2 className={iconClass} size={18} />
            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Resume Link */}
        <div>
          <label className={labelClass}>
            Resume Link <span className="text-emerald-400">*</span>
            <span className="block mt-1 text-xs font-normal text-gray-400">
              Paste the Google Drive link to your resume. Ensure the file is in <strong>PDF</strong> format and the sharing permission is set to <strong>"Anyone with the link can view"</strong>.
            </span>
          </label>

          <div className="relative mt-2">
            <input
              type="text"
              name="resumelink"
              value={formData.resumelink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className={`peer ${inputClass}`}
            />
            <Link2 className={iconClass} size={18} />
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
            <GraduationCap size={16} className="text-zinc-500" />
            Current Year <span className="text-emerald-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {YEARS.map((year) => {
              const checked = formData.year === year;
              return (
                <label
                  key={year}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    checked
                      ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200 shadow-[0_0_14px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-emerald-400/30 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="year"
                    value={year}
                    checked={checked}
                    onChange={handleChange}
                    className="accent-emerald-500"
                  />
                  {year} Year
                </label>
              );
            })}
          </div>
        </div>

        {/* CPI */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            CPI <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="cpi"
              value={formData.cpi}
              onChange={handleChange}
              placeholder="e.g. 9.76"
              min="0"
              max="10"
              step="0.01"
              inputMode="decimal"
              className={`peer ${inputClass}`}
            />
            <Gauge className={iconClass} size={18} />
          </div>
          <p className="mt-2 font-mono text-xs text-zinc-500">
            // Enter your current CPI (0 – 10)
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}