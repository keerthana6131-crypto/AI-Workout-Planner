function analyzeUser(data) {
  const { goal, level, equipment, time } = data;

  let difficulty;
  if (level === "beginner") difficulty = "low";
  else if (level === "intermediate") difficulty = "medium";
  else difficulty = "high";

  let workoutType = equipment === "none" ? "bodyweight" : "resistance";

  let mode;
  if (time < 20) mode = "HIIT";
  else if (time <= 40) mode = "mixed";
  else mode = "strength";

  let focus = goal;

  return {
    difficulty,
    workoutType,
    mode,
    focus
  };
}

module.exports = { analyzeUser };
