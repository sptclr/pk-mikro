import React from "react";

const Badge = ({ status }: { status: string }) => {
  const statusClasses: { [key: string]: string } = {
    Tervalidasi: "bg-green-600 text-white",
    Draf: "bg-gray-600 text-white",
    "Batal Validasi": "bg-red-600 text-white",
    Selesai: "bg-green-600 text-white",
  };
  return (
    <div
      className={`px-3 py-1 rounded-full text-sm text-center w-fit ${
        statusClasses[status] || ""
      }`}
    >
      {status}
    </div>
  );
};

export default Badge;
