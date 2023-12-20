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
  coachSchools?: ICoachSchool[];
}

export interface IRegion {
  id?: string;
  name: string;
  level?: number;
  parent?: IRegion;
  parent_id?: string;
  children?: IRegion[];
  schoolsCount?: number;
}

export interface IUser {
  id: string;
  language?: string;
  email: string;
  name: string;
  role: 'analyst' | 'admin';
  region_id?: string;
  region?: IRegion;
  district?: string;
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

export interface ICoachSchool {
  id?: string;
  coach: ICoach;
  school: ISchool;
}

export interface ISchool {
  id?: string;
  name: string;
  emis_number: string;
  coachSchools?: ICoachSchool[];
  teachers?: ITeacher[];
  region_id?: string;
  region?: IRegion;
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
  feedback_id?: string;

  answers: IAnswer[];

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
  answer_id: IAnswer['id'];
}

export interface ILogs {
  id: string;
  user: IUser;
  description: string;
  created_at: string;
}

export interface IStars {
  needsWork: number;
  keepWorking: number;
  needsAttention: number;
  almostThere: number;
  doingGreat: number;
}

export interface ITeachingPractices {
  name: string;
  data: {
    stars: IStars;
    teachers: number;
    teachersShowingImprovement: number;
    teacherWithoutFeedback: number;
  };
}

export interface IDashboard {
  teachingPractices: ITeachingPractices[];
  engagement: {
    teachersCoached: number;
    activeCoaches: number;
    coachingSessions: number;
    coachingSessionPerTeacher: number;
    coachingSessionPerTeacherGoal: number;
    teacherThatCompletedSecondSession: number;
  };
  targetedImprovementAreas: {};
  avg: {
    national: number;
    regional: number;
    school: number;
  };
}
