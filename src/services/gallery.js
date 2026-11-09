import { getCookie } from "react-use-cookie";

export const galleryApiUrl = `${import.meta.env.VITE_API_URL}/gallery`;

export const storeGallery = async (data) => {
  const formData = new FormData();

  Array.from(data.images).forEach((image) => {
    formData.append("images[]", image);
  });

  const res = await fetch(galleryApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
    body: formData,
  });
  return res;
};

export const destroyGallery = (id) => {
  return fetch(`${galleryApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchGallery = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());
