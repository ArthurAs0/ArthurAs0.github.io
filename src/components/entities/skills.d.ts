/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType boolean */
  isCoreSkill?: boolean;
  /** @wixFieldType number */
  yearsOfExperience?: number;
}
