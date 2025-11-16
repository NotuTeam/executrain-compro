/** @format */

export interface TestimoniProps {
  _id: string;
  person_name: string;
  person_title: string;
  testimonial: string;
  photo: {
    public_id: string;
    url: string;
  };
}
