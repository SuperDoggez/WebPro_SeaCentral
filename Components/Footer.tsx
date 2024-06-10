import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Footer = () => {
    
    const [ContactData, setContactData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('api/admin/editinfo/contact');
            setContactData(response.data.Hotelinfo[0]);
            console.log(response.data.Hotelinfo[0]);
          } catch {
            console.log('error');
          }
        };
        fetchData();
      },[])
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-400">Phone: {ContactData.contact}</p>
            <p className="text-gray-400">Email: {ContactData.address}</p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.556c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.95.564-2.005.974-3.127 1.195-.896-.954-2.173-1.55-3.591-1.55-2.72 0-4.924 2.204-4.924 4.925 0 .386.043.762.127 1.124-4.09-.205-7.719-2.166-10.148-5.144-.424.729-.667 1.576-.667 2.476 0 1.708.87 3.213 2.188 4.097-.808-.026-1.569-.248-2.233-.617v.062c0 2.385 1.697 4.375 3.95 4.828-.413.113-.849.172-1.298.172-.318 0-.626-.03-.928-.086.626 1.953 2.444 3.376 4.6 3.416-1.68 1.316-3.799 2.101-6.102 2.101-.397 0-.788-.023-1.175-.067 2.179 1.396 4.767 2.209 7.548 2.209 9.057 0 14.01-7.506 14.01-14.01 0-.214-.005-.426-.014-.637.961-.694 1.796-1.56 2.457-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-5.486 0-9.838 4.352-9.838 9.838 0 4.345 3.155 7.953 7.258 9.61-.1-.78-.195-1.978.04-2.828.205-.77 1.32-4.89 1.32-4.89s-.34-.68-.34-1.68c0-1.574.914-2.748 2.05-2.748.967 0 1.437.725 1.437 1.595 0 .973-.618 2.428-.937 3.784-.266 1.112.563 2.014 1.67 2.014 2.003 0 3.45-2.114 3.45-5.16 0-2.692-1.933-4.584-4.695-4.584-3.2 0-5.075 2.397-5.075 4.874 0 .973.37 2.017.833 2.587.092.11.106.206.08.316-.086.34-.274 1.111-.31 1.268-.05.206-.162.25-.377.15-1.387-.633-2.253-2.618-2.253-4.22 0-3.426 2.497-6.58 7.203-6.58 3.78 0 6.722 2.7 6.722 6.308 0 3.76-2.369 6.78-5.654 6.78-1.103 0-2.141-.57-2.497-1.242l-.682 2.62c-.25.975-.927 2.196-1.387 2.939.74.228 1.517.352 2.326.352 5.486 0 9.838-4.352 9.838-9.838S17.486 2.163 12 2.163z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.994 12.47c0-6.627-5.37-11.996-11.997-11.996C5.37.474.002 5.843.002 12.47c0 6.106 4.48 11.162 10.338 11.987v-8.458H7.526v-3.53h2.814V9.343c0-2.8 1.66-4.346 4.206-4.346 1.22 0 2.49.216 2.49.216v2.723h-1.402c-1.379 0-1.805.86-1.805 1.745v2.055h3.072l-.491 3.53h-2.581v8.458c5.857-.825 10.337-5.881 10.337-11.987z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Sea Central. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
