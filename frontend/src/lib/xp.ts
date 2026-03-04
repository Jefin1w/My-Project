import { supabase } from "@/integrations/supabase/client";

export async function awardXP({
  userId,
  playerName,
  activityType,
  subjectId,
  lessonId,
  xpAmount,
}: {
  userId: string;
  playerName: string;
  activityType: "topic_completed" | "quiz_completed";
  subjectId: string;
  lessonId?: string;
  xpAmount: number;
}) {
  await supabase.from("xp_log").insert({
    player_name: playerName,
    activity_type: activityType,
    subject_id: subjectId,
    lesson_id: lessonId || null,
    xp_earned: xpAmount,
  });

  const { data: existing } = await supabase
    .from("leaderboard")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("leaderboard")
      .update({
        total_xp: existing.total_xp + xpAmount,
        topics_completed:
          activityType === "topic_completed"
            ? existing.topics_completed + 1
            : existing.topics_completed,
        quizzes_completed:
          activityType === "quiz_completed"
            ? existing.quizzes_completed + 1
            : existing.quizzes_completed,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("leaderboard").insert({
      user_id: userId,
      player_name: playerName,
      email: userId,
      total_xp: xpAmount,
      topics_completed: activityType === "topic_completed" ? 1 : 0,
      quizzes_completed: activityType === "quiz_completed" ? 1 : 0,
    });
  }
}
