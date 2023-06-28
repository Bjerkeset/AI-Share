"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// This is the main functional component, "PromptCard". It is a presentational component that receives post data, and several callback functions as props.
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  // Destructuring session data from the useSession hook. useSession provides data related to the currently logged-in user.
  const { data: session } = useSession();

  // usePathname and useRouter are custom hooks from the Next.js library to get the current URL pathname and to perform router actions respectively.
  const pathName = usePathname();
  const router = useRouter();

  // Local state to store the status of the copied content.
  const [copied, setCopied] = useState("");

  // This function redirects the user to the post creator's profile page when the user's profile image or username is clicked.
  const handleProfileClick = () => {
    // The conditional statement checks if the current session user is the post creator, then navigates to the "/profile" page, otherwise it navigates to the profile of the clicked user.
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // This function handles the copying of the post prompt to the clipboard.
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    // After copying, it sets the 'copied' state back to false after 3 seconds.
    setTimeout(() => setCopied(false), 3000);
  };

  // The render section of the component which uses JSX syntax to define the structure of the PromptCard.
  return (
    <div className="prompt_card">
      {/* User information and copy button section */}
      <div className="flex justify-between items-start gap-5">
        {/* This section handles the display of the post creator's image and username. It also contains the logic to navigate to the creator's profile page when clicked. */}
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          {/* Next.js Image component is used for better performance and optimization. */}
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          {/* This section displays the username and email of the post creator */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 dark:text-gray-200">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500 dark:text-gray-400 ">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* The button to copy the post's prompt. It also shows a check mark icon when the text is successfully copied. */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={18}
            height={18}
          />
        </div>
      </div>

      {/* The post's prompt */}
      <p className="my-4 font-satoshi text-md text-gray-700 dark:text-gray-100">
        {post.prompt}
      </p>

      {/* The post's tag. Clicking on it will trigger the handleTagClick function. */}
      <div className="flex flex-wrap font-inter text-sm cursor-pointer">
        {(Array.isArray(post.tag) ? post.tag : post.tag.split(" ")).map(
          (tag, index) => (
            <span
              key={index}
              className="tag_item"
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              {tag}
            </span>
          )
        )}
      </div>

      {/* This conditional render section only shows the 'Edit' and 'Delete' options when the user is on their own profile page. */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          {/* 'Edit' button */}
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          {/* 'Delete' button */}
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

      {/* This conditional render section only shows the 'Edit' option when the user is on another page that isn't their profile page. */}
      {session?.user.id === post.creator._id && pathName !== "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 dark:border-gray-600">
          {/* 'Edit' button */}
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
        </div>
      )}
    </div>
  );
};

// Export the component for use in other parts of the application
export default PromptCard;
