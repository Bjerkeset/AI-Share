"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/profile";

import React from "react";

/**
 * This is a Next.js functional component called 'MyProfile'. It's primarily responsible for fetching
 * and managing the posts of a logged-in user on a personalized profile page. The user can also edit
 * or delete their posts. To achieve this functionality, it utilizes the useState and useEffect hooks from React,
 * alongside session management using next-auth and routing using next/router.
 */

const MyProfile = () => {
  // Using the 'useSession' hook from 'next-auth/react' to access the current user session.
  const { data: session } = useSession();

  // Initializing 'posts' state to an empty array and 'setPosts' function to update it using the useState hook from React.
  const [posts, setPosts] = useState([]);

  // Accessing the 'useRouter' hook from 'next/router' to enable navigation around the application.
  const router = useRouter();

  // The useEffect hook ensures that the fetchPosts function is invoked anytime the 'session?.user.id' changes.
  useEffect(() => {
    // Defining an asynchronous function to fetch the posts for the current user.
    const fetchPosts = async () => {
      // Making an API call to the server to retrieve the user's posts.
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // Updating 'posts' state with the data received from the server.
      setPosts(data);
    };

    // Checking if the user ID is defined before attempting to fetch the user's posts.
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // The 'handleEdit' function is used to navigate the user to a page where they can edit a specific post.
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // The 'handleDelete' function is responsible for deleting a specific post by the user.
  const handleDelete = async (post) => {
    // Confirming with the user if they truly want to delete the post.
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        // Making an API call to the server to delete the specified post.
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "delete",
        });

        // Filtering out the deleted post from the 'posts' state.
        const filteredPost = posts.filter((p) => p._id !== post._id);

        // Updating 'posts' state with the remaining posts after deletion.
        setPosts(filteredPost);
      } catch (error) {
        console.log("error deleting: ", error);
      }
    }
  };

  // The component returns a 'Profile' component, passing necessary props including name, description, posts data, and the handleEdit and handleDelete functions.
  return (
    <Profile
      name="my"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
