export interface ISync {
  id: string;
  model: string;
  deviceId: string;
  apiLevel: string;
  lastPulledAt: Date;
}

export interface ITeacher {
  id: string;
  name: string;
  surname: string;
  birthdate?: Date;
  subject?: string;
  emis_number?: string;
}

export interface ICoach {
  id: string;
  name: string;
  surname: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface IGuide {
  id: string;
  content: string;
}

export interface ICompetence {
  id?: string;
  title: string;
  guide_id?: IGuide['id'];
  questions?: IQuestion[];
  deleted_at?: Date | null;
  answers?: IAnswer[];
}

export interface IQuestion {
  id?: string;
  title: string;
  description: string;
  questionnaire_id?: IQuestionnaire['id'];
  competence_id?: ICompetence['id'];
  competence?: ICompetence;
}

export interface IQuestionnaire {
  id: string;
  title: string;
  active: boolean;
}

export interface IOption {
  id: string;
  title: string;
  question_id: IQuestion['id'];
}

export interface IAnswer {
  id: string;
  value: number;
  question_id: IQuestion['id'];
  option_id: IOption['id'];
  session_id: ISession['id'];

  question: IQuestion;
}

export interface ISchool {
  id?: string;
  name: string;
}

export interface ITeacher {
  id: string;
  name: string;
}

export interface ISession {
  id: string;
  name: string;
  status: string;
  applicationDate: string;
  questionnaire_id: IQuestionnaire['id'];
  coach_id: IUser['id'];
  school_id: ISchool['id'];
  teacher_id: ITeacher['id'];
  subject: string;

  answers: IAnswer[];

  feedbacks: IFeedback[];

  coach: ICoach;
  school: ISchool;
  teacher: ITeacher;
}

export interface IDocumentation {
  id: string;
  name: string;
  value: string;
  session_id: ISession['id'];
}

export interface IFeedback {
  id: string;
  name: string;
  value: string;
  session_id: ISession['id'];
}

export interface ILogs {
  id: string;
  user: IUser;
  description: string;
  created_at: string;
}
