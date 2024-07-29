import { useRef, useState } from "react";
import ProfilePic from "../assets/user.png";

const ProfilePicUploader = () => {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className="image-upload-container">
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="upload image"
              className="img-display-after"
            />
          ) : (
            <img
              src={ProfilePic}
              alt="upload image"
              className="img-display-before"
            />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

        <button
          className="image-edit-button"
          onClick={handleClick}
          style={{
            position: "relative",
            top: "75px",
            left: "-45px",
            padding: "5px",
            backgroundColor: "#a0c1ff",
            border: "1px solid #ccc",
            borderRadius: "50%",
          }}
        >
          ✏️
        </button>
      </div>
    </>
  );
};

export default ProfilePicUploader;
