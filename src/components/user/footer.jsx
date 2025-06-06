import React from "react";

// Komponen Footer
const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-white" id="footer">
      {/* Konten Utama Footer */}
      <div className="w-full max-w-[1339px] px-[170px] py-[60px] text-center bg-white rounded-[20px]">
        <h2 className="text-2xl font-bold text-black">
          Sistem Pakar Diagnosis Penyakit Jantung
        </h2>
        <p className="mt-4 text-base text-black">
          Sistem ini menggunakan Fuzzy Mamdani untuk membantu deteksi dini
          penyakit jantung. Pengguna cukup memasukkan data dan gejala yang
          dialami untuk mendapatkan hasil diagnosis awal terkait Penyakit
          Jantung.
        </p>

        {/* Kontak */}
        <div className="flex flex-col items-center mt-6 space-y-2">
          <ContactItem icon={<PhoneIcon />} text="+62 123-456-789" />
          <ContactItem
            icon={<EmailIcon />}
            text="info.sistempakarjantung@gmail.com"
          />
        </div>
      </div>

      {/* Garis Pembatas */}
      <hr className="w-full mt-6 border-t border-black opacity-10" />

      {/* Copyright */}
      <div className="flex justify-center items-center p-16 w-screen bg-[#d6eadf] border border-[#d6eadf]">
        <p className="text-xl text-center text-black">
          © 2025 Sistem Pakar Diagnosis Penyakit Jantung
        </p>
      </div>
    </footer>
  );
};

// Komponen Item Kontak
const ContactItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-xl text-black">{text}</span>
  </div>
);

// Ikon Telepon
const PhoneIcon = () => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9025 6.37726C13.7175 5.87378 13.347 5.46015 12.8668 5.22121C12.3866 4.98227 11.8331 4.93613 11.32 5.09226C8.88748 5.84226 7.18748 7.92976 7.55248 10.3448C7.96322 13.0245 8.87132 15.6038 10.23 17.9498C11.5761 20.2895 13.3414 22.3615 15.4375 24.0623C17.3225 25.5873 19.9675 25.1673 21.8325 23.4173C22.2248 23.0491 22.4628 22.5458 22.4985 22.0089C22.5343 21.4721 22.365 20.9417 22.025 20.5248L20.69 18.8923C20.4226 18.564 20.0627 18.3236 19.6571 18.2024C19.2514 18.0811 18.8187 18.0846 18.415 18.2123L15.335 19.1873L14.7975 18.6323C14.1205 17.9296 13.5282 17.1502 13.0325 16.3098C12.5524 15.4593 12.178 14.5534 11.9175 13.6123L11.71 12.8748L14.085 10.6873C14.3992 10.3968 14.6197 10.0193 14.7181 9.60286C14.8165 9.18644 14.7884 8.75013 14.6375 8.34976L13.9025 6.37726Z"
      fill="black"
    />
  </svg>
);

// Ikon Email
const EmailIcon = () => (
  <svg
    width={27}
    height={22}
    viewBox="0 0 27 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 1H3.5C2.11929 1 1 2.11929 1 3.5V18.5C1 19.8807 2.11929 21 3.5 21H23.5C24.8807 21 26 19.8807 26 18.5V3.5C26 2.11929 24.8807 1 23.5 1Z"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 4.75L14.7875 11.875C14.4016 12.1168 13.9554 12.245 13.5 12.245C13.0446 12.245 12.5984 12.1168 12.2125 11.875L1 4.75"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Footer;
