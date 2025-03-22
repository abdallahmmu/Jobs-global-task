export interface JobsDTO {
  id: string;
  jobable_id: string;
  cover: string;
  minimum_years_of_experience: number;
  title: string;
  description: string | null;
  basicSalaryTo: number;
  basicSalaryFrom: number;
  salaryTo: number;
  salaryFrom: number;
  numberOfVacancies: number;
  incrementalId: number;
  type: string;
  priority: string;
  durationEnd: string | null;
  durationStart: string | null;
  jobDurationEnd: string | null;
  jobDurationStart: string | null;
  dateClosed: string | null;
  dateRejected: string | null;
  datePublished: string | null;
  preferredApplicantCountriesSources: any[];
  jobLocations: any[];
  industries: any[];
  skills: string | null;
  tags: string[];
  work_space_meta_data: any;
  created_at: string;
  updated_at: string;
  apply: ApplyDetails[];
  location: string | null;
  attachments: any[];
  page: PageDetails;
  savedJob: any | null;
  jobAlert: any | null;
  applications: ApplicationDetails[];
  saved: boolean;
  hasJobAlert: boolean;
  applied: boolean;
}

interface ApplyDetails {
  id: string;
  status: string;
  cvUrl: string | null;
  applyableType: string;
  applyableId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
}

interface PageDetails {
  id: string;
  employerId: string | null;
  name: string;
  telephone: string;
  alias: string;
  about: string | null;
  services: string | null;
  company_size: string;
  page_type: string;
  work_space_meta_data: any;
  createdAt: string;
  updatedAt: string;
  status: string;
  location: LocationDetails;
  information: any;
}

interface LocationDetails {
  id: string;
  city_id: string;
  country_id: string;
  address_line_one: string;
  address_line_two: string;
  createdAt: string;
  updatedAt: string;
  country: CountryDetails;
  city: CityDetails;
  industry: IndustryDetails;
  coordinates: Coordinates;
  country_and_city: string;
}

interface CountryDetails {
  id: string;
  flag: string;
  name: string;
  language: LanguageDetails;
  alpha2Code: string;
  callingCode: string;
  workSpaceMetaData: CountryMetaData;
}

interface LanguageDetails {
  iso6391: string;
  iso6392: string;
  name: string;
  nativeName: string;
}

interface CountryMetaData {
  id: string;
  code: string;
  name: string;
  phoneCode: string;
}

interface CityDetails {
  id: string;
  stateId: string | null;
  countryId: string;
  region: string | null;
  name: string;
  latitude: number;
  longitude: number;
  workSpaceMetaData: CityMetaData;
  createdAt: string;
  updatedAt: string;
}

interface CityMetaData {
  countryId: string;
  id: string;
  name: string;
  geoLocation: GeoLocation;
}

interface GeoLocation {
  lat: string;
  lon: string;
}

interface IndustryDetails {
  id: string;
  name: string;
  workSpaceMetaData: IndustryMetaData;
  createdAt: string;
  updatedAt: string;
}

interface IndustryMetaData {
  id: string;
  name: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface ApplicationDetails {
  id: string;
  status: string;
  cvUrl: string | null;
  applyableType: string;
  applyableId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
}




export interface ResultObjectDTO<T>{
    data:T[];
    meta:MetaDTO
}

export interface MetaDTO {
    current_page:number;
    form:number;
    last_page:number;
    per_page:number;
    to:number;
    total:number
}

interface workSpaceDTO {
    address: string | null;
    assignee: string[];
    base_salary_from: number;
    base_salary_to: number;
    category: any[];
    country_location: any[];
    country_source: any[];
    cover: string;
    created_by_user_id: string;
    currency_code: string;
    date_created: string;
    date_published: string | null;
    date_updated: string;
    day_time: any[];
    email_linked: string;
    employment_type: number;
    incremental_id: string | null;
    is_crawled: number;
    is_deleted: number;
    job_duration_end: string | null;
    job_duration_start: string | null;
    job_group_id: string;
    job_group_name: string;
    job_industry: number[];
    job_post_id: string;
    job_title: string;
    job_title_header: string;
    job_title_lower: string;
    latitude: string;
    longitude: string;
    page_id: string;
    page_name: string;
    post_status: string;
    priority: number;
    salary_from: number;
    salary_to: number;
    tag: string[];
    trip_id: string;
    trip_job_id: string;
    vacancies: string;
    yr_exp: number;
  }
