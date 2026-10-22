import type { ResumeView } from "@/entities/resume";
import { Card, Divider } from "@/shared/ui";
import { LinkIcon, MailIcon, MapPinIcon } from "@/shared/ui/icons";

export type ResumePreviewProps = {
  resume: ResumeView;
  className?: string;
};

export function ResumePreview({ className, resume }: ResumePreviewProps) {
  return (
    <article className={className}>
      <Card>
        <div>
          <h2 className="text-3xl font-medium"> {resume.fullName}</h2>
          <p className="py-3 text-xl text-accent">{resume.directionTitle}</p>
          <div className="flex gap-4 text-text-soft">
            <span className="flex items-center gap-2">
              <MapPinIcon />
              {resume.location}
            </span>
            <span>Удаленно</span>
            <span className="flex items-center gap-2">
              <MailIcon />
              {resume.email}
            </span>
          </div>
        </div>
        <Divider className="my-8" />
        <div>
          <div className="pb-4">
            <h3 className="pb-4 text-xl font-bold text-accent">О себе</h3>
            <p className="">{resume.summary}</p>
          </div>

          <div className="pb-8">
            <h3 className="pb-4 text-xl font-bold text-accent">Опыт работы</h3>
            {resume.experience.map((workPlace, index) => {
              return (
                <>
                  <div className="grid gap-2" key={index}>
                    <h3 className="text text-xl font-semibold">{workPlace.role}</h3>
                    <p className="font-thin">{workPlace.company}</p>
                    <p className="text-sm text-text-soft">{workPlace.from}</p>
                  </div>
                  <div className="grid gap-3 pt-4">
                    {workPlace.description?.map((desc, index) => {
                      return (
                        <p key={index} className="flex gap-3">
                          <span>•</span>
                          {desc}
                        </p>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <h3 className="pb-4 text-xl font-bold text-accent">Образование</h3>
            {resume.education.map((course, index) => {
              return (
                <div className="grid gap-2 pb-4" key={index}>
                  <h3 className="text-xl font-semibold"> {course.institution}</h3>
                  <p className="text-lg">{course.degree}</p>
                  <p className="text-sm text-text-soft">{course.year}</p>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="py-4 text-xl font-bold text-accent">Навыки</h3>
            <div className="flex-cols flex gap-2">
              {resume.skills.map((skill, index) => {
                return (
                  <Card className="bg-[#E7EFE8] px-3 py-2 text-accent" key={index}>
                    {skill}
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="py-4 text-xl font-bold text-accent">Языки</h3>
            <div className="grid gap-2">
              {resume.languages.map((language, index) => {
                return <p key={index}>{language}</p>;
              })}
            </div>
          </div>

          <div>
            <h3 className="py-4 text-xl font-bold text-accent">Ссылки</h3>
            <div className="grid gap-2">
              {resume.links.map((link, index) => {
                return (
                  <a
                    href={link}
                    key={index}
                    className="flex cursor-pointer items-center gap-4 text-accent"
                  >
                    <LinkIcon className="h-4 w-4 shrink-0" />
                    <p className="text-lg underline">{link}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}
