import { database } from "./utils/database";
import { ClientSession, Db, ObjectId } from "mongodb";
import logger from "./utils/logger";

import * as crypto from "crypto";

async function insertMockData(db: Db, session: ClientSession) {
  const userId = "storm_preview_user";
  const currentTime = Math.floor(Date.now() / 1000);

  // Create main user
  const mainUser = {
    id: userId,
    username: "storm_dev",
    email: "storm@devconnect.dev",
    bio: "Full-stack developer passionate about building scalable web applications. Love working with React, Node.js, and MongoDB.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express", "REST APIs"],
    profile_picture_url: "/images/storm_profile.jpg"
  };

  // Create additional mock users
  const mockUsers = [
    {
      id: crypto.randomUUID(),
      username: "sarah_codes",
      email: "sarah@devconnect.dev",
      bio: "Frontend enthusiast specializing in React and modern CSS. Always learning new technologies and sharing knowledge.",
      skills: ["React", "CSS", "HTML", "JavaScript", "Tailwind", "UI/UX"],
      profile_picture_url: "/images/sarah_profile.jpg"
    },
    {
      id: crypto.randomUUID(),
      username: "alex_backend",
      email: "alex@devconnect.dev",
      bio: "Backend engineer with expertise in distributed systems and microservices architecture. Coffee addict ☕",
      skills: ["Node.js", "Python", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
      profile_picture_url: "/images/alex_profile.jpg"
    },
    {
      id: crypto.randomUUID(),
      username: "maya_fullstack",
      email: "maya@devconnect.dev",
      bio: "Full-stack developer and open source contributor. Building tools that make developers' lives easier.",
      skills: ["Vue.js", "Node.js", "GraphQL", "TypeScript", "AWS", "CI/CD"],
      profile_picture_url: "/images/maya_profile.jpg"
    },
    {
      id: crypto.randomUUID(),
      username: "jordan_mobile",
      email: "jordan@devconnect.dev",
      bio: "Mobile developer creating cross-platform apps. React Native advocate and tech blogger.",
      skills: ["React Native", "Swift", "Kotlin", "Firebase", "Mobile UI"],
      profile_picture_url: "/images/jordan_profile.jpg"
    }
  ];

  const allUsers = [mainUser, ...mockUsers];

  // Insert users
  await db.collection("users").insertMany(allUsers, { session });

  // Create posts
  const posts = [
    {
      id: crypto.randomUUID(),
      user_id: userId,
      content: "🚀 Just launched DevConnect! Excited to share this platform with the developer community. Looking forward to connecting with all of you and seeing the amazing projects you'll share here!",
      created_at: currentTime - 7200,
      likes_count: 5
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[0].id,
      content: "Working on a new React component library focused on accessibility. Any tips on testing screen reader compatibility? #a11y #react",
      created_at: currentTime - 5400,
      likes_count: 3
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[1].id,
      content: "Just finished implementing a distributed caching layer using Redis. Performance improvements are incredible! 🔥 Happy to share my approach if anyone's interested.",
      created_at: currentTime - 4800,
      likes_count: 4
    },
    {
      id: crypto.randomUUID(),
      user_id: userId,
      content: "Question for the community: What's your preferred approach for handling authentication in modern web apps? JWT vs sessions? I've been exploring different patterns lately.",
      created_at: currentTime - 3600,
      likes_count: 2
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[2].id,
      content: "Released v2.0 of my open source CLI tool! New features include interactive prompts and better error handling. Check it out on GitHub! 🎉",
      created_at: currentTime - 2700,
      likes_count: 6
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[3].id,
      content: "Debugging a tricky React Native navigation issue. Anyone else experienced weird behavior with nested navigators? The struggle is real 😅",
      created_at: currentTime - 1800,
      likes_count: 1
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[0].id,
      content: "Hot take: Writing good documentation is just as important as writing good code. Your future self (and your teammates) will thank you! 📝",
      created_at: currentTime - 900,
      likes_count: 7
    },
    {
      id: crypto.randomUUID(),
      user_id: mockUsers[1].id,
      content: "Spent the weekend learning Rust. The ownership model is mind-bending but fascinating. Any Rust developers here with learning resources to recommend?",
      created_at: currentTime - 600,
      likes_count: 2
    }
  ];

  await db.collection("posts").insertMany(posts, { session });

  // Create comments
  const comments = [
    {
      id: crypto.randomUUID(),
      post_id: posts[0].id,
      user_id: mockUsers[0].id,
      content: "This looks amazing! Can't wait to explore all the features.",
      created_at: currentTime - 7000
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[0].id,
      user_id: mockUsers[1].id,
      content: "Great work on this! The UI is really clean.",
      created_at: currentTime - 6800
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[1].id,
      user_id: userId,
      content: "Check out the jest-axe library! It's great for automated accessibility testing.",
      created_at: currentTime - 5200
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[1].id,
      user_id: mockUsers[2].id,
      content: "Also recommend testing with actual screen readers like NVDA or JAWS. Automated tests can only catch so much.",
      created_at: currentTime - 5100
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[2].id,
      user_id: mockUsers[3].id,
      content: "Would love to hear more about your implementation! What was your cache invalidation strategy?",
      created_at: currentTime - 4600
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[3].id,
      user_id: mockUsers[1].id,
      content: "I prefer JWT for stateless APIs, especially in microservices. Sessions work better for traditional server-rendered apps IMO.",
      created_at: currentTime - 3400
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[3].id,
      user_id: mockUsers[0].id,
      content: "JWT with refresh tokens is my go-to. Best of both worlds!",
      created_at: currentTime - 3300
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[4].id,
      user_id: userId,
      content: "Congrats on the release! 🎊",
      created_at: currentTime - 2500
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[5].id,
      user_id: mockUsers[2].id,
      content: "I had similar issues! Make sure you're not creating multiple navigator instances. Check your component mounting logic.",
      created_at: currentTime - 1600
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[6].id,
      user_id: userId,
      content: "100% agree! Documentation is a form of communication and it's crucial for team success.",
      created_at: currentTime - 800
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[6].id,
      user_id: mockUsers[1].id,
      content: "Preach! I always document my APIs with examples. Makes onboarding so much smoother.",
      created_at: currentTime - 700
    },
    {
      id: crypto.randomUUID(),
      post_id: posts[7].id,
      user_id: mockUsers[3].id,
      content: "The Rust Book is excellent! Also check out Rustlings for hands-on practice.",
      created_at: currentTime - 500
    }
  ];

  await db.collection("comments").insertMany(comments, { session });

  // Create likes
  const likes = [
    // Likes for post 0 (DevConnect launch)
    { id: crypto.randomUUID(), post_id: posts[0].id, user_id: mockUsers[0].id },
    { id: crypto.randomUUID(), post_id: posts[0].id, user_id: mockUsers[1].id },
    { id: crypto.randomUUID(), post_id: posts[0].id, user_id: mockUsers[2].id },
    { id: crypto.randomUUID(), post_id: posts[0].id, user_id: mockUsers[3].id },
    { id: crypto.randomUUID(), post_id: posts[0].id, user_id: userId },
    
    // Likes for post 1 (React a11y)
    { id: crypto.randomUUID(), post_id: posts[1].id, user_id: userId },
    { id: crypto.randomUUID(), post_id: posts[1].id, user_id: mockUsers[2].id },
    { id: crypto.randomUUID(), post_id: posts[1].id, user_id: mockUsers[3].id },
    
    // Likes for post 2 (Redis caching)
    { id: crypto.randomUUID(), post_id: posts[2].id, user_id: userId },
    { id: crypto.randomUUID(), post_id: posts[2].id, user_id: mockUsers[0].id },
    { id: crypto.randomUUID(), post_id: posts[2].id, user_id: mockUsers[2].id },
    { id: crypto.randomUUID(), post_id: posts[2].id, user_id: mockUsers[3].id },
    
    // Likes for post 3 (Authentication question)
    { id: crypto.randomUUID(), post_id: posts[3].id, user_id: mockUsers[0].id },
    { id: crypto.randomUUID(), post_id: posts[3].id, user_id: mockUsers[1].id },
    
    // Likes for post 4 (CLI tool release)
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: userId },
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: mockUsers[0].id },
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: mockUsers[1].id },
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: mockUsers[3].id },
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: mockUsers[2].id },
    { id: crypto.randomUUID(), post_id: posts[4].id, user_id: mockUsers[0].id },
    
    // Likes for post 5 (React Native issue)
    { id: crypto.randomUUID(), post_id: posts[5].id, user_id: mockUsers[2].id },
    
    // Likes for post 6 (Documentation hot take)
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: userId },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[1].id },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[2].id },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[3].id },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[0].id },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[1].id },
    { id: crypto.randomUUID(), post_id: posts[6].id, user_id: mockUsers[2].id },
    
    // Likes for post 7 (Rust learning)
    { id: crypto.randomUUID(), post_id: posts[7].id, user_id: mockUsers[3].id },
    { id: crypto.randomUUID(), post_id: posts[7].id, user_id: mockUsers[0].id }
  ];

  await db.collection("likes").insertMany(likes, { session });
}


// Flag to ensure we only try to populate once per process
let populationAttempted = false;

/**
 * Populates the database with mock data for the App
 */
async function populate_with_mock_data(): Promise<void> {
  // Process-level check to prevent multiple calls within the same process
  if (populationAttempted) {
    logger.info("Population already attempted in this process, skipping");
    return;
  }

  // Mark that we've attempted population in this process
  populationAttempted = true;

  const db = await database.getDb();
  const mockDataCollection = db.collection("mock_data_execution");

  try {
    // Try to create the flag document with a unique index
    // This will fail if another process has already created it
    const result = await mockDataCollection.updateOne(
      { _id: new ObjectId("000000000000000000000001") },
      {
        $setOnInsert: {
          executed: true,
          timestamp: Math.floor(Date.now() / 1000),
          instance: `instance-${Math.random().toString(36).substring(2, 15)}`,
        },
      },
      { upsert: true },
    );

    // If the document was not inserted (upserted), it already exists
    if (result.upsertedCount === 0) {
      logger.info("Mock data flag already exists, skipping execution");
      return;
    }

    const userId = "storm_preview_user";
    logger.info(`Starting mock data population for ${userId}...`);

    // If we get here, we're the first to create the flag document
    // Now proceed with actual data insertion
    const client = await database.getClient();
    const session = await client.startSession();

    try {
      await session.withTransaction(async () => {
        await insertMockData(db, session);

        // Update the flag to mark successful completion
        await mockDataCollection.updateOne(
          { _id: new ObjectId("000000000000000000000001") },
          {
            $set: {
              completed: true,
              completedTimestamp: Math.floor(Date.now() / 1000),
            },
          },
          { session },
        );

        logger.info("Successfully populated mock data");
      });
    } catch (error) {
      logger.error("Failed to populate mock data during transaction:", error);

      // Mark the flag as failed so we can retry next time
      try {
        await mockDataCollection.updateOne(
          { _id: new ObjectId("000000000000000000000001") },
          {
            $set: {
              failed: true,
              failedTimestamp: Math.floor(Date.now() / 1000),
              error: (error as Error).toString(),
            },
          },
        );
      } catch (updateError) {
        logger.error("Failed to update error state:", updateError);
      }

      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    // Handle DuplicateKey errors gracefully - this means another process beat us to it
    if ((error as any).code === 11000) {
      logger.info("Another process is handling population, skipping");
      return;
    }

    logger.error("Failed to initialize mock data population:", error);
    throw error;
  }
}

// never change this!
export default populate_with_mock_data;
