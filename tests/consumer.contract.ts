// Compile real frontend use cases against every candidate backend contract in CI.
import {
  getResume,
  createResume,
  updateResume,
  reviewResume,
} from "../src/shared/api/generated/client/resumes/resumes";
import { getJob } from "../src/shared/api/generated/client/jobs/jobs";
import { getProfile } from "../src/shared/api/generated/client/profile/profile";
import {
  startInterview,
  getInterviewResult,
} from "../src/shared/api/generated/client/interviews/interviews";
import type {
  Resume,
  AuthResponse,
  ApiError,
  ProgressSummary,
} from "../src/shared/api/generated/models";

export async function verifyConsumer(id: string, content: Resume["content"]) {
  const created: Resume = await createResume({ directionId: id, title: "My resume" });
  const resume = await getResume(created.id);
  const saved: Resume = await updateResume(resume.id, { revision: resume.revision, content });
  const accepted = await reviewResume(saved.id, { revision: saved.revision });
  const job = await getJob(accepted.jobId);
  if (job.result?.kind === "RESUME_REVIEW") job.result.suggestions.map((s) => s.sourceRevision);
  const profile = await getProfile();
  const session = await startInterview({
    directionId: profile.directionId || id,
    type: "TECHNICAL",
  });
  const result = await getInterviewResult(session.id);
  const topicIds: string[] = result.topics.map((topic) => topic.skillId);
  return topicIds;
}
export function sessionToken(response: AuthResponse): string {
  return response.accessToken;
}
export function errorMessage(response: ApiError): string {
  return response.error.message;
}
export function completedCount(response: ProgressSummary): number {
  return response.completedSkills;
}
