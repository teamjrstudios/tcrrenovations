"use client"
import {createContext, useContext} from "react";

type ContactInfo = {
    address: string;
    phone: string;
    phoneRaw: number;
    email: string;
    hours: string;
};

const defaultInfo: ContactInfo = {
    address: "1470 Buck Hill Dr, Southampton PA, United States",
    phone: "+1 (267) 650-0283",
    phoneRaw: 12676500283,
    email: "info@tcrrenovations.com",
    hours: "Monday – Friday: 8:00 AM – 6:00 PM",
};

const ContactInfoContext = createContext<ContactInfo>(defaultInfo);

export const useContactInfo = () => useContext(ContactInfoContext);