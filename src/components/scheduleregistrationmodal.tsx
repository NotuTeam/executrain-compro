/** @format */

"use client";

import { useState } from "react";
import { X } from "lucide-react";

import Button from "@/components/atomic/button";
import { useSubmitScheduleRegistration } from "@/services/schedule-registration/hook";

interface ScheduleRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  scheduleDate: string;
  scheduleType: "REGULAR" | "FREE_TRIAL";
}

export default function ScheduleRegistrationModal({
  isOpen,
  onClose,
  productName,
  scheduleDate,
  scheduleType,
}: ScheduleRegistrationModalProps) {
  const { mutate: submitRegistration, isPending } =
    useSubmitScheduleRegistration();

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (
      !form.fullName ||
      !form.companyName ||
      !form.emailAddress ||
      !form.phoneNumber
    ) {
      setError("Mohon lengkapi semua field wajib.");
      return;
    }

    setError("");

    submitRegistration(
      {
        full_name: form.fullName,
        company_name: form.companyName,
        email_address: form.emailAddress,
        phone_number: form.phoneNumber,
        product_name: productName,
        schedule_date: scheduleDate,
        schedule_type: scheduleType,
      },
      {
        onSuccess: () => {
          setForm({
            fullName: "",
            companyName: "",
            emailAddress: "",
            phoneNumber: "",
          });
          onClose();
        },
        onError: () => {
          setError("Gagal mengirim pendaftaran. Silakan coba lagi.");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Registration Form
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, companyName: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={form.emailAddress}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, emailAddress: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Schedule Date
              </label>
              <input
                type="text"
                value={scheduleDate}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button label="Cancel" type="default" onClick={onClose} />
            <Button
              label={isPending ? "Submitting..." : "Submit"}
              type={isPending ? "disable" : "primary"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
