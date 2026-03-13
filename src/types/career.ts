export interface CareerProps {
  _id: string;
  title?: string;
  slug?: string;
  description?: string[];
  requirements?: string[];
  experiance_requirement?: string[];
  applicant_question?: string[];
  location?: string;
  department?: string;
  job_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  vacancies?: number;
  contact_email?: string;
  deadline?: string;
  status?: string;
}

export interface CareerGalleryProps {
  _id: string;
  title?: string;
  description?: string;
  image?: {
    public_id?: string;
    url?: string;
  };
  order?: number;
  is_active?: boolean;
}