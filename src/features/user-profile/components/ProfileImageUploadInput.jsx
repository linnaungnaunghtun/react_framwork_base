import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { getCookie } from "react-use-cookie";
import { HiPhoto } from "react-icons/hi2";
import Spinner from "../../../components/Spinner";

const ProfileImageUploadInput = ({
  inputName,
  uploadUrl,
  register,
  setValue,
  defaultValue,
  required = false,
  errors,
}) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setValue(inputName, defaultValue);
      setUploadedPhoto(defaultValue);
    }
  }, []);

  const removeUploadedPhoto = () => {
    setUploadedPhoto(null);
    setValue(inputName, "");
  };

  const handleUpload = async () => {
    let files = [];

    // Check if the modern File System Access API is supported
    if (typeof window.showOpenFilePicker === "function") {
      try {
        // Use the modern API to select a file
        const fileHandles = await window.showOpenFilePicker({
          multiple: false,
        });
        for (let fileHandle of fileHandles) {
          const file = await fileHandle.getFile();
          files.push(file);
        }
      } catch (error) {
        console.error("Error selecting files with showOpenFilePicker:", error);
        toast.error("Failed to select files.");
        return;
      }
    } else {
      // Fallback to the traditional <input type="file"> for unsupported browsers
      try {
        files = await new Promise((resolve, reject) => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = false; // Allow only one file
          input.onchange = (e) => {
            resolve(Array.from(e.target.files));
          };
          input.onerror = (e) => {
            reject(new Error("File selection failed."));
          };
          input.click();
        });
      } catch (error) {
        console.error("Error selecting files with fallback method:", error);
        toast.error("Failed to select files.");
        return;
      }
    }

    // Proceed with file upload
    if (files.length === 0) {
      console.error("No files selected.");
      toast.error("No files selected.");
      return;
    }

    try {
      const formData = new FormData();

      // Append files to FormData
      for (let file of files) {
        formData.append("images[]", file);
      }

      setIsSending(true);

      // Send the files to the server
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("my_token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedPhoto(data.data[0].url.large);
        setValue(inputName, data.data[0].url.large);
        toast.success(data.message);
      } else {
        const errorText = await response.text();
        console.error("Failed to upload files:", errorText);
        toast.error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("An error occurred while uploading files.");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div>
      <div
        className={`bg-gray-50 border ${
          errors[inputName]
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
      >
        {uploadedPhoto ? (
          <PreviewImageUi
            thumbnail={uploadedPhoto}
            removeUploadedPhoto={removeUploadedPhoto}
          />
        ) : (
          <UploaderUi handleUpload={handleUpload} isSending={isSending} />
        )}
      </div>
      <input
        type="text"
        className="hidden"
        {...register(inputName, { required })}
      />
    </div>
  );
};

export default ProfileImageUploadInput;

const UploaderUi = ({ handleUpload, isSending }) => {
  return (
    <>
      {isSending ? (
        <Spinner size="size-9" />
      ) : (
        <p className="h-14 cursor-pointer" onClick={handleUpload}>
          <HiPhoto className=" size-7 fill-gray-500" />
          <span>Click to upload</span>
        </p>
      )}
    </>
  );
};

const PreviewImageUi = ({ thumbnail, removeUploadedPhoto }) => {
  return (
    <div className=" flex gap-3 items-end">
      <div className="">
        <LightGallery>
          <a href={thumbnail}>
            <img
              src={thumbnail}
              className=" w-14 h-14 object-cover rounded-md "
              alt=""
            />
          </a>
        </LightGallery>
      </div>
      <button
        type="button"
        onClick={removeUploadedPhoto}
        className=" text-red-700"
      >
        Remove
      </button>
    </div>
  );
};
