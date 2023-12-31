"use client";

import { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button, Input } from "@/components";
import { images } from "@/assets";
import { useCurrentNFTContext } from "@/context/NFTContext";

const CreateNFT = () => {
  const { theme } = useTheme();
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const { uploadToIPFS, createNFT } = useCurrentNFTContext();
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFile: File[]) => {
      if (uploadToIPFS) {
        const response = await uploadToIPFS(acceptedFile[0]);

        if (response.success) {
          setFileUrl(response.message);
        } else {
          console.log(response.message);
        }
      }
    },
    [uploadToIPFS]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-lg border-dashed cursor-pointer
      ${isDragActive ? "border-file-active" : ""}
      ${isDragAccept ? "border-file-accept" : ""}
      ${isDragReject ? "border-file-reject" : ""}
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold xs:ml-0">
          Create new NFT
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    alt="upload"
                    className={`${
                      theme === "light" ? "filter invert" : ""
                    } object-contain`}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or Browse media on your device
                </p>
              </div>
            </div>

            {fileUrl ? (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    alt="asset_file"
                    className="rounded mt-4"
                    width={350}
                    height={350}
                  />
                </div>
              </aside>
            ) : (
              ""
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
