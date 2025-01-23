import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { BiLike, BiMessageRoundedDetail, BiTrash, BiEdit } from "react-icons/bi";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  // Refs for animations
  const postsContainerRef = useRef(null);
  const fabButtonRef = useRef(null);
  const modalRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 0.7, ease: "back.out(1.7)" },
        });

        // Enhanced background panel animations with rotation and scale
        gsap.fromTo(
          ".bg-green-200",
          { x: "-100%", rotation: -30, opacity: 0, scale: 0.8 },
          {
            x: "0%",
            rotation: 0,
            opacity: 0.5,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
          }
        );

        gsap.fromTo(
          ".bg-blue-200",
          { x: "100%", rotation: 30, opacity: 0, scale: 0.8 },
          {
            x: "0%",
            rotation: 0,
            opacity: 0.5,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
          }
        );

        // Enhanced title animation with 3D effect
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: -100,
            scale: 0.5,
            rotationX: -90,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
          }
        );

        // Floating animation for title background
        gsap.to(".blur-lg", {
          y: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        // Enhanced staggered post animations with 3D flip
        tl.to(
          ".post-card",
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power4.out",
            transformOrigin: "50% 0%",
            clearProps: "all",
            onStart: (el) => {
              gsap.set(el, {
                opacity: 0,
                rotationX: -90,
                y: 50,
                scale: 0.8,
              });
            },
          },
          "-=0.5"
        );

        // Enhanced FAB button with bounce
        tl.fromTo(
          fabButtonRef.current,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          }
        );

        // Continuous floating animation for FAB
        gsap.to(fabButtonRef.current, {
          y: "-10px",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });

      return () => ctx.revert();
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const posts = document.querySelectorAll(".post-card");

        posts.forEach((post, index) => {
          const direction = index % 2 === 0 ? -100 : 100;

          gsap.fromTo(
            post,
            {
              x: direction,
              opacity: 0,
              scale: 0.9,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.2,
            }
          );
        });
      });

      return () => ctx.revert();
    });
  }, []);

  useEffect(() => {
    // Wait for next frame to ensure DOM elements are ready
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 0.5, ease: "power2.out" },
        });

        // Set initial states
        gsap.set(titleRef.current, { opacity: 0, y: -50 });
        gsap.set(".post-card", { opacity: 0, y: 100 });
        gsap.set(fabButtonRef.current, { scale: 0, rotation: -180 });

        // Animate title
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        // Animate posts
        tl.to(
          ".post-card",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
          },
          "-=0.4"
        );

        // Animate FAB button
        tl.to(
          fabButtonRef.current,
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      });

      return () => ctx.revert(); // Cleanup
    });

    fetchPosts();
  }, []);

  // Modal animation
  useEffect(() => {
    if (showPostForm && modalRef.current) {
      const ctx = gsap.context(() => {
        // Backdrop animation
        gsap.fromTo(".bg-black", { opacity: 0 }, { opacity: 0.5, duration: 0.3, ease: "power2.out" });

        // Modal animation
        gsap.fromTo(
          modalRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotationX: -20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.5,
            ease: "power3.out",
            transformOrigin: "50% 50%",
          }
        );
      });

      return () => ctx.revert();
    }
  }, [showPostForm]);

  // New scroll-triggered animations for posts
  useEffect(() => {
    const posts = document.querySelectorAll(".post-card");

    posts.forEach((post) => {
      gsap.from(post, {
        scrollTrigger: {
          trigger: post,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        rotationX: -15,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    });
  }, [posts]);

  // Enhanced like animation function
  const animateLike = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {
      scale: 1.5,
      rotation: 15,
      duration: 0.15,
      ease: "power2.out",
    })
      .to(element, {
        scale: 1,
        rotation: 0,
        duration: 0.15,
        ease: "elastic.out(1, 0.3)",
      })
      .to(element, {
        y: -20,
        opacity: 0,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.in",
      })
      .set(element, {
        y: 0,
        opacity: 1,
        scale: 1,
      });
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/api/v1/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSubmit = async () => {
    if (newPost.trim() === "") return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPost }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const data = await response.json();

      // Update posts with the new post
      setPosts((prevPosts) => [data.post, ...prevPosts]);
      setNewPost("");
      setShowPostForm(false);

      // Animate the new post
      gsap.from(".post-card:first-child", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    } catch (err) {
      setError("Failed to create post");
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to like post");

      fetchPosts();
    } catch (err) {
      setError("Failed to like post");
    }
  };

  const handleAddComment = async (postId, comment) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      const data = await response.json();
      // Update posts with the new comment
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? data.post : post)));
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete post");
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  const handleUpdatePost = async (postId, content) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      const data = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? data.post : post)));
      setEditingPost(null);
    } catch (err) {
      setError("Failed to update post");
    }
  };

  const handleUpdateComment = async (postId, commentId, content) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to update comment");

      const data = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? data.post : post)));
      setEditingComment(null);
    } catch (err) {
      setError("Failed to update comment");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      const data = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? data.post : post)));
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="mega-container pt-16">
      <div className="bg-gray-100 min-h-screen p-4 pb-24 relative overflow-hidden flex justify-center">
        {/* Left Color Panel */}
        <div className="absolute left-0 top-0 w-1/4 h-full bg-green-200 z-0"></div>

        {/* Right Color Panel */}
        <div className="absolute right-0 top-0 w-1/4 h-full bg-blue-200 z-0"></div>

        <div className="relative z-10 w-full max-w-2xl">
          {" "}
          {/* Reduced width of the post container */}
          <h1 ref={titleRef} className="text-3xl font-bold mb-4 relative text-center">
            Community Hub
            <div
              className="absolute -z-10 w-20 h-20 bg-green-200 rounded-full opacity-50 blur-lg"
              style={{ top: "-50%", left: "-10%" }}
            ></div>
          </h1>
          {/* Posts List */}
          <div ref={postsContainerRef} className="space-y-4">
            {posts?.map((post) => {
              if (!post?._id) return null; // Skip invalid posts

              const isOwnPost = post.user?._id === currentUserId;
              const hasLikedPost = post.likes?.some((like) => like.userId === currentUserId);

              return (
                <div
                  key={post._id}
                  className={`post-card bg-white p-5 m-5 rounded-lg shadow-md transform transition-all hover:scale-[1.01] hover:shadow-lg
                              ${isOwnPost ? "border-l-4 border-green-500 bg-green-50" : ""}`}
                >
                  <div className={`flex items-center ${isOwnPost ? "justify-between" : "mb-2"}`}>
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                                    ${isOwnPost ? "bg-green-600" : "bg-green-500"}`}
                      >
                        {post.user?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="ml-3">
                        <h3 className={`font-semibold ${isOwnPost ? "text-green-800" : ""}`}>
                          {isOwnPost ? "You" : post.user?.name || "Anonymous"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown date"}
                        </p>
                      </div>
                    </div>

                    {isOwnPost && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <BiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="text-red-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <BiTrash size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {editingPost?._id === post._id ? (
                    <div className="mt-4 mb-4">
                      <textarea
                        value={editingPost.content}
                        onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setEditingPost(null)}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdatePost(post._id, editingPost.content)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`${isOwnPost ? "mt-4 bg-white p-4 rounded-lg" : "mt-2"}`}>
                      <p className={`${isOwnPost ? "text-gray-800" : "text-gray-700"}`}>{post.content}</p>
                    </div>
                  )}

                  {/* Stats display for own posts */}
                  {isOwnPost && (
                    <div className="mt-4 flex items-center space-x-6 text-gray-500 border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <BiLike size={20} className="text-green-500" />
                        <span className="text-sm font-medium">{post.likes?.length || 0} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BiMessageRoundedDetail size={20} className="text-green-500" />
                        <span className="text-sm font-medium">{post.comments?.length || 0} comments</span>
                      </div>
                    </div>
                  )}

                  {/* Interaction section for other users' posts */}
                  {!isOwnPost && (
                    <>
                      <div className="flex items-center space-x-4 mt-4 mb-3">
                        <button
                          onClick={(e) => {
                            handleLike(post._id);
                            animateLike(e.currentTarget);
                          }}
                          className={`flex items-center space-x-1 transition-colors duration-300 ${
                            hasLikedPost ? "text-blue-500" : "text-gray-600 hover:text-blue-500"
                          }`}
                        >
                          <BiLike size={18} />
                          <span>{post.likes?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 transition-colors duration-300">
                          <BiMessageRoundedDetail size={18} />
                          <span>{post.comments?.length || 0}</span>
                        </button>
                      </div>

                      {/* Comments section with null checks */}
                      <div className="space-y-2 mt-4">
                        {post.comments?.map((comment) => {
                          if (!comment?._id) return null; // Skip invalid comments

                          const isOwnComment = comment.user?._id === currentUserId;

                          return (
                            <div
                              key={comment._id}
                              className={`bg-gray-100 p-2 rounded-lg shadow-sm ${
                                isOwnComment ? "border-l-4 border-green-500" : ""
                              }`}
                            >
                              {editingComment?._id === comment._id ? (
                                <div>
                                  <input
                                    type="text"
                                    value={editingComment.content}
                                    onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                      onClick={() => setEditingComment(null)}
                                      className="text-sm text-gray-600 hover:text-gray-800"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleUpdateComment(post._id, comment._id, editingComment.content)}
                                      className="text-sm text-green-600 hover:text-green-800"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-start">
                                  <p className="text-sm text-gray-800">
                                    <span className="font-semibold">
                                      {isOwnComment ? "You" : comment.user?.name || "Anonymous"}:
                                    </span>
                                    {comment.content}
                                  </p>
                                  {isOwnComment && (
                                    <div className="flex space-x-2 ml-2">
                                      <button
                                        onClick={() => setEditingComment(comment)}
                                        className="text-gray-500 hover:text-blue-500"
                                      >
                                        <BiEdit size={16} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteComment(post._id, comment._id)}
                                        className="text-gray-500 hover:text-red-500"
                                      >
                                        <BiTrash size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Comment input - Only show if not the post owner */}
                        <div className="flex mt-3">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.target.value.trim() !== "") {
                                handleAddComment(post._id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          ref={fabButtonRef}
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              setShowPostForm(true);
            }
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 hover:scale-110"
        >
          <AiOutlinePlus size={24} />
        </button>

        {/* Post Creation Modal */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create Post</h2>
                <button
                  onClick={() => setShowPostForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4 h-32 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Share your sustainability tip..."
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;
