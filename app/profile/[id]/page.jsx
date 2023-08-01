"use client";
import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Profile from "@components/Profile";

import React from "react";

const UserProfile = ({params}) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page.`}
      data={posts}
    />
  );
};

export default UserProfile;
