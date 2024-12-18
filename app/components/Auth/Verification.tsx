"use client"

import { style } from '@/app/style';
import { useActivationMutation } from '@/redux/features/auth/authapi';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

type Props = {
    setRoute: (route: string) => void;
};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation()
    const [invalidError, setInvalidError] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account cretaed successfully");
            setRoute("Login")
        }
        if (error) {
            if ("data" in error) {
                const errordata = error as any
                toast.error(errordata.data.message)
                setInvalidError(true)
            }
        }
    }, [isSuccess, error])



    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [VerifyNumber, setVerifynumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });

    const verificationHandler = async () => {
        const verificationNumber = Object.values(VerifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        });
    };

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerificationnumber = { ...VerifyNumber, [index]: value };
        setVerifynumber(newVerificationnumber);

        if (value === "" && index > 0) {
            inputRef[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRef[index + 1].current?.focus();
        }
    };

    return (
        <div>
            <h1 className={`${style.title}`}>
                Verify Your Account
            </h1>
            <br />
            <div className="w-full flex justify-center items-center mt-2">
                <div className="w-[50px] h-[50px] rounded-full bg-[#497Df2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <br />
            <br />
            <div className="text-center text-md">
                <h5 className='mb-5'>
                    Eneter the 4-digit you recevied
                </h5>
            </div>
            <div className="m-auto flex items-center justify-around">

                {Object.keys(VerifyNumber).map((key, index) => (
                    <input
                        type="number"
                        key={key}
                        ref={inputRef[index]}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError
                            ? "shake border-red-500"
                            : "dark:border-white border-[#0000004a]"
                            }`}
                        placeholder=""
                        maxLength={1}
                        value={VerifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>

            <br /><br />
            <div className="w-full flex justify-center">
                <button className={`${style.button}`} onClick={verificationHandler}>
                    Verify OTP
                </button>
            </div>
            <br />
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Go back to sign in?{" "}
                <span
                    className="text-[#2190ff] pl-1 cursor-pointer"
                    onClick={() => setRoute("Login")}
                >
                    Sign in
                </span>
            </h5>
        </div>
    );
};

export default Verification;
