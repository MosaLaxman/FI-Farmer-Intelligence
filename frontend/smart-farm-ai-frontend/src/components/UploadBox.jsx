import { UploadCloud, ImagePlus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function UploadBox({
  fileInputRef,
  fileName,
  onChange,
  onFileSelect,
  preview,
}) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const [file] = event.dataTransfer.files || [];
    onFileSelect(file);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-dashed p-4 transition duration-300 sm:p-5 ${
        isDragging
          ? "border-emerald-400 bg-emerald-50 shadow-[0_20px_50px_-30px_rgba(16,185,129,0.65)]"
          : "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 hover:border-emerald-300 hover:shadow-[0_20px_50px_-34px_rgba(16,185,129,0.45)]"
      }`}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={onChange}
        type="file"
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-[1.4rem] border border-white/80 bg-white/70 px-6 py-12 text-center transition duration-300 hover:bg-white"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-[0_20px_40px_-28px_rgba(16,185,129,0.8)]">
            <UploadCloud size={28} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">{t("upload.title")}</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            {t("upload.subtitle")}
          </p>
          <span className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
            {t("upload.button")}
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-[0_24px_40px_-32px_rgba(15,23,42,0.35)]">
            <img alt="Leaf preview" className="h-72 w-full object-cover sm:h-80" src={preview} />
          </div>

          <div className="flex items-center gap-3 rounded-[1.4rem] border border-emerald-100 bg-white px-4 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ImagePlus size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("upload.selected")}
              </p>
              <p className="truncate text-sm font-medium text-slate-700">{fileName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
