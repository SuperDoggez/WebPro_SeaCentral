import React from 'react'

interface ProgressBarProps {
    step: number;
}


export const ProgressBar = ({ step }: ProgressBarProps) => {
    return (
      <div className="w-full flex items-center py-4 relative">
      {["เลือก Package", "กรอกข้อมูล", "ตรวจสอบข้อมูล", "จองสำเร็จ"].map((label, index) => (
        <div key={index} className="w-1/5 flex flex-col items-center relative">
          {index !== 0 && (
            <div
              className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 ${
                step > index + 1 ? 'bg-grayprogress' : 'bg-gray-400'
              }`}
              style={{ zIndex: -1 }}
            ></div>
          )}
          <div
            className={`relative z-10 h-10 w-10 font-bold rounded-full flex items-center justify-center transition-transform duration-300 ${
              step > index + 1
                ? 'bg-white border-white'
                : step === index + 1
                ? 'bg-white transform scale-110 border-white'
                : 'bg-grayprogress border-grayprogress'
            } border-2 `}
          >
            
            {index + 1}
          </div>
          <p className="mt-2 text-white text-center ">{label}</p>
        </div>
      ))}
    </div>
    );
  };
  
export default ProgressBar;
  
