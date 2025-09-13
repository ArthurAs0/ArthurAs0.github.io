/**
 * Collection ID: workexperience
 * Interface for WorkExperience
 */
export interface WorkExperience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType boolean */
  isCurrentJob?: boolean;
  /** @wixFieldType text */
  responsibilities?: string;
  /** @wixFieldType url */
  companyWebsite?: string;
}
