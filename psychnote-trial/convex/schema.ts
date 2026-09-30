import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  moods: defineTable({
    userId: v.string(),
    mood: v.union(
      v.literal("very_happy"),
      v.literal("happy"),
      v.literal("neutral"),
      v.literal("sad"),
      v.literal("very_sad")
    ),
    reason: v.optional(v.string()),
    date: v.string(), // YYYY-MM-DD format
  }).index("by_user_and_date", ["userId", "date"]),

  assessments: defineTable({
    userId: v.string(),
    type: v.union(
      v.literal("anxiety"),
      v.literal("depression"),
      v.literal("stress"),
      v.literal("self_esteem")
    ),
    answers: v.array(v.number()),
    score: v.number(),
    recommendations: v.array(v.string()),
  }).index("by_user", ["userId"]),

  emergencyTechniques: defineTable({
    category: v.string(),
    title: v.string(),
    description: v.string(),
    steps: v.array(v.string()),
    duration: v.optional(v.string()),
  }),

  dailyContent: defineTable({
    date: v.string(),
    type: v.union(
      v.literal("fact"),
      v.literal("tip"),
      v.literal("exercise"),
      v.literal("myth")
    ),
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
  }).index("by_date", ["date"]),

  studentResources: defineTable({
    category: v.string(),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    tags: v.array(v.string()),
  }),

  emergencySupport: defineTable({
    userId: v.string(),
    technique: v.string(),
    type: v.optional(v.string()),
    completed: v.boolean(),
    rating: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  studentProgress: defineTable({
    userId: v.string(),
    category: v.string(),
    exerciseCompleted: v.string(),
    progress: v.number(),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
